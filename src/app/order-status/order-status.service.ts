import {Injectable} from '@angular/core';
import {CaremarkDataService, DATASOURCE_TYPES} from '../service/caremark-data.service';
import {
  FASTSTART_ORDER_STATUS,
  FASTSTART_ORDER_STATUS_MAP, ORDER_STATUS_CODES_ATTENTION_ONHOLDS,
  ORDER_STATUS_CODES_MAP, ORDER_STATUS_CODES_ON_HOLD, ORDER_STATUS_TYPES,
} from './order-status.constants';
import {OrderStatus, RxInfo} from './order-status.interface';
import {MemberService} from '../service/member.service';
import * as moment from 'moment';
import {caremarksdk} from '../types/caremarksdk';
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
        }).catch((error) => {
          resolve([]);
        });
      }).catch((error) => {
        resolve([]);
      });
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

  transformSDK(orders: caremarksdk.Order[]) {
    const transformedOrders: OrderStatus[] = [];
    for (const pbmOrder of orders) {
      let orderStatus: any = {};
      orderStatus.OrderDate = pbmOrder.OrderDate;
      orderStatus.OrderNumber = pbmOrder.OrderNumber;
      orderStatus.OrderType = pbmOrder.OrderType;
      orderStatus.ParticipantID = pbmOrder.ParticipantID;
      orderStatus.RxList = [];
      if (pbmOrder.PrescriptionList) {
        for (const rx of pbmOrder.PrescriptionList) {
          let rxInfo: any = {};
          rxInfo.DateOfBirth = rx.DateOfBirth;
          rxInfo.DoctorFullName = rx.DoctorFullName;
          rxInfo.DrugDosage = rx.DrugDosage;
          rxInfo.DrugStrength = rx.DrugStrength;
          rxInfo.DrugName = rx.DrugName;
          rxInfo.ParticipantID = rx.ParticipantID;
          rxInfo.Status = rx.StatusDescription;
          rxInfo.StatusReasonCode = rx.StatusReasonCode;
          rxInfo.PatientFirstName = rx.PatientFirstName;
          rxInfo.PatientLastName = rx.PatientLastName;
          // Map status codes
          if (rx.StatusReasonCode && ORDER_STATUS_CODES_MAP[rx.StatusReasonCode]) {
            rxInfo.Status = ORDER_STATUS_CODES_MAP[rx.StatusReasonCode].RxStatus;
            rxInfo.StatusPriority = ORDER_STATUS_CODES_MAP[rx.StatusReasonCode].ReasonCodePriority;
            rxInfo.StatusDescription = ORDER_STATUS_CODES_MAP[rx.StatusReasonCode].RxStatusDescription;
          }
          // FastOrder Status Code
          if (orderStatus.OrderType && orderStatus.OrderType.toUpperCase() === ORDER_STATUS_TYPES.FAST_ORDER) {
            rxInfo.Status = FASTSTART_ORDER_STATUS_MAP[rxInfo.Status];
            if (!rxInfo.Status) {
              rxInfo.Status = FASTSTART_ORDER_STATUS.FASTSTART_STATUS_DEFAULT;
            }
          }
          orderStatus.RxList.push(rxInfo);
        }
      }
      orderStatus.RxFills = orderStatus.RxList.length;
      transformedOrders.push(orderStatus);
    }
    return transformedOrders;

  }

  transformICE(orders: any) {
    const transformedOrders: OrderStatus[] = [];
    return transformedOrders;

  }

  transform(orders: any, dataSource: DATASOURCE_TYPES): any {
    let transformedOrders: OrderStatus[];
    if (dataSource === DATASOURCE_TYPES.CAREMARK_SDK) {
      transformedOrders = this.transformSDK(orders);

    } else if (dataSource === DATASOURCE_TYPES.VORDEL_ICE) {
      transformedOrders = this.transformICE(orders);

    }
    return transformedOrders;
  }


  public getRecentOrders() {
    return new Promise((resolve, reject) => {
      const recentOrders: OrderStatus[] = [];

      this.caremarkDataService.getOrderStatus().then((ordersResponse: any) => {
        const orders: OrderStatus[] = this.transform(ordersResponse.Results, this.caremarkDataService.dataSource);

        // Set OrderStatus based Rx priority
        for (const order of orders) {
          // Skip Orders when No Rxs
          if (!order.RxList.length) {
            continue;
          }

          order.OrderStatus = order.RxList[0].Status;
          order.OrderedFor = OrderStatusService.ORDER_STATUS_FOR_PREFIX + order.RxList[0].PatientFirstName + ' ' +
            order.RxList[0].PatientLastName;
          for (const rx of order.RxList) {
            if (_.includes(ORDER_STATUS_CODES_ON_HOLD, rx.StatusReasonCode)) {
              order.OrderStatus = rx.Status;
              order.OrderedFor = OrderStatusService.ORDER_STATUS_FOR_PREFIX + rx.PatientFirstName + ' ' +
                rx.PatientLastName;
              break;
            }
          }

          if (order.OrderType && order.OrderType.toUpperCase() === ORDER_STATUS_TYPES.FAST_ORDER) {
            if (order.RxList) {
              order.OrderStatus = order.RxList[0].Status;
            }
          }

          // console.log(JSON.stringify(orderStatus));
          recentOrders.push(order);
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
          for (const rx of order.RxList) {
            if (_.includes(ORDER_STATUS_CODES_ATTENTION_ONHOLDS, rx.StatusReasonCode)) {
              // don't include other Rx
              order.RxList = [];
              order.RxList.push(rx);
              holdOrders.push(order);
              // We only care about first Rx onhold per order
              break;
            }
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
