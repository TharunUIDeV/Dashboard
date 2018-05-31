import {Injectable} from '@angular/core';
import {CaremarkDataService} from '../service/caremark-data.service';
import {
  FASTSTART_ORDER_STATUS,
  FASTSTART_ORDER_STATUS_MAP, ORDER_STATUS_CODES_ATTENTION_ONHOLDS,
  ORDER_STATUS_CODES_MAP, ORDER_STATUS_CODES_ON_HOLD,
} from './order-status.constants';
import {OrderStatus} from './order-status.interface';
import {MemberService} from '../service/member.service';
import * as moment from 'moment';
import {caremarksdk} from '../types/caremarksdk';
import MemberInfoResult = caremarksdk.MemberInfoResult;
import * as _ from 'lodash';

@Injectable()
export class OrderStatusService {
  public static ORDER_STATUS_FOR_PREFIX = 'for ';


  constructor(private caremarkDataService: CaremarkDataService,
              private memberSerivce: MemberService) {
  }

  private getAge(dob) {
    if (dob) {
      const now = moment(new Date());
      const end = moment(dob);
      const duration = moment.duration(now.diff(end));
      const years = Math.ceil(duration.asYears());
      console.log(years);
      return years;
    }
    return undefined;
  }

  private applyFamilyFilter(orders: OrderStatus[]) {
    return new Promise((resolve, reject) => {
      this.memberSerivce.getMemberDetails().then((memberDetails: any) => {
        this.memberSerivce.getUnderAgeLimitPzn().then((underageLimit: string) => {
          resolve(this.processFamilyFilter(orders, memberDetails, underageLimit));
        }).catch((error) => {resolve([]); });
      }).catch((error) => {resolve([]); });
    });
  }

  private processFamilyFilter(orders: OrderStatus[], memberDetails: any, underageLimit: string) {
    let ageNotMinor;
    const nonEligibles = [];
    const familyAccessDenied = [];
    const mainMember: any = memberDetails;
    const filteredOrders = [];
    // No family members
    if (!orders || (orders && orders.length === 0)) {
      return orders;
    }

    if (!mainMember || !underageLimit) {
      return [];
    }

    if (mainMember.family && mainMember.family.dependentList) {

      // Apply family accesss filter
      for (const member of mainMember.family.dependentList.memberInfo) {
        const age: number = this.getAge(member.dateOfBirth);
        const minorAge: number = parseInt(underageLimit, 10);
        ageNotMinor = age > minorAge;

        if (member.securityOptions && member.securityOptions.fastStart
          && member.securityOptions.fastStart === 'false' && ageNotMinor) {
          familyAccessDenied.push(member.internalID);
        }

        if (member.eligibility.eligible === 'false') {
          nonEligibles.push(member.internalID);
        }

      }
      for (const order of orders) {
        if (!_.includes(familyAccessDenied, order.ParticipantID) &&
          !_.includes(nonEligibles, order.ParticipantID)) {
          filteredOrders.push(order);
        }
      }
      return filteredOrders;
    }

    return orders;

  }


  public getRecentOrders() {
    return new Promise((resolve, reject) => {
      const recentOrders: OrderStatus[] = [];

      this.caremarkDataService.getOrderStatus().then((ordersResponse: any) => {
        const orders = ordersResponse.Results;

        for (const order of orders) {
          const orderStatusDetail: any = {};

          orderStatusDetail.OrderDate = order.OrderDate;
          orderStatusDetail.OrderNumber = order.OrderNumber;
          orderStatusDetail.OrderType = order.OrderType;
          orderStatusDetail.ParticipantID = order.ParticipantID;
          // Order Status takes priority of prescription on hold otherwise first prescriotion status
          if (order.PrescriptionList) {

            orderStatusDetail.OrderStatusCode = order.PrescriptionList[0].StatusReasonCode;
            orderStatusDetail.OrderStatus = order.PrescriptionList[0].Status;
            orderStatusDetail.OrderStatusDescription = order.PrescriptionList[0].StatusDescription;
            orderStatusDetail.OrderedFor = OrderStatusService.ORDER_STATUS_FOR_PREFIX + order.PrescriptionList[0].PatientFirstName + ' ' +
                                            order.PrescriptionList[0].PatientLastName;
            orderStatusDetail.RxFills = order.PrescriptionList.length;
            orderStatusDetail.DoctorFullName = order.PrescriptionList[0].DoctorFullName;
            orderStatusDetail.DrugName = order.PrescriptionList[0].DrugName;
            orderStatusDetail.DrugDosage = order.PrescriptionList[0].DrugDosage;
            orderStatusDetail.DrugStrength = order.PrescriptionList[0].DrugStrength;
            for (const prescription of order.PrescriptionList) {
              if (_.includes(ORDER_STATUS_CODES_ON_HOLD, prescription.StatusReasonCode)) {
                orderStatusDetail.DoctorFullName = prescription.DoctorFullName;
                orderStatusDetail.DrugName = prescription.DrugName;
                orderStatusDetail.DrugDosage = prescription.DrugDosage;
                orderStatusDetail.DrugStrength = prescription.DrugStrength;
                orderStatusDetail.OrderStatus = prescription.Status;
                orderStatusDetail.OrderStatusDescription = prescription.StatusDescription;
                orderStatusDetail.OrderedFor = OrderStatusService.ORDER_STATUS_FOR_PREFIX + prescription.PatientFirstName + ' ' +
                                        prescription.PatientLastName;
                break;
              }
            }
          }

          if (orderStatusDetail.OrderStatusCode && ORDER_STATUS_CODES_MAP[orderStatusDetail.OrderStatusCode]) {
            orderStatusDetail.OrderStatus = ORDER_STATUS_CODES_MAP[orderStatusDetail.OrderStatusCode].RxStatus;
            orderStatusDetail.OrderStatusDescription = ORDER_STATUS_CODES_MAP[orderStatusDetail.OrderStatusCode].RxStatusDescription;
            orderStatusDetail.OrderPriority = ORDER_STATUS_CODES_MAP[orderStatusDetail.OrderStatusCode].ReasonCodePriority;
          }


          if (order.OrderType && order.OrderType.toUpperCase() === 'FastStart'.toUpperCase()) {
            if (order.PrescriptionList) {
              orderStatusDetail.OrderStatus = FASTSTART_ORDER_STATUS_MAP[order.PrescriptionList[0].Status];
            }
            if (!orderStatusDetail.OrderStatus) {
              orderStatusDetail.OrderStatus = FASTSTART_ORDER_STATUS.FASTSTART_STATUS_DEFAULT;
            }
          }
          // Skip Orders when No Rxs
          if (!orderStatusDetail.RxFills) {
            continue;
          }
          // console.log(JSON.stringify(orderStatusDetail));
          recentOrders.push(orderStatusDetail);
        }
        this.applyFamilyFilter(recentOrders).then((filteredOrders) => {
          // console.log(filteredOrders);
          resolve(filteredOrders);
        });
      }).catch((error) => {
        console.error('Failed to get WidgetData in OrderStatus');
        console.error(JSON.stringify(error));
        reject(error);
      });
    });
  }

  public getRecentOrdersOnHold() {

    return new Promise((resolve, reject) => {
      const holdOrders: OrderStatus[] = [];

      this.getRecentOrders().then((orders: OrderStatus[]) => {
        for (const order of orders) {
          if (_.includes(ORDER_STATUS_CODES_ATTENTION_ONHOLDS, order.OrderStatusCode)) {
            holdOrders.push(order);
          }
        }
        this.applyFamilyFilter(holdOrders).then((filteredOrders) => {
          resolve(filteredOrders);
        });
      }).catch((error) => {
        console.error('Failed to getRecentOrders');
        reject(error);
      });
    });
  }

}
