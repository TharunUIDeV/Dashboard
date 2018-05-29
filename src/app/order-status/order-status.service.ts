import { Injectable } from '@angular/core';
import {CaremarkDataService} from '../service/caremark-data.service';
import {OrderStatusFilterPipe} from './order-status-filter.pipe';
import {
  FASTSTART_ORDER_STATUS,
  FASTSTART_ORDER_STATUS_MAP,
  ORDER_STATUS_CODES_MAP,
  ORDER_STATUS_CODES_ON_HOLD
} from './order-status.constants';
import {OrderStatus} from './order-status.interface';

@Injectable()
export class OrderStatusService {
  public static ORDER_STATUS_HOLD_TEXT = 'On Hold';
  private OrderStatusData: OrderStatus[] = [];


  constructor(private caremarkDataService: CaremarkDataService,
              private orderStatusFilter: OrderStatusFilterPipe) { }

  private applyFamilyFilter() {

  }

  public getRecentOrders() {
    return new Promise((resolve, reject) => {
    let recentOrders: OrderStatus[] = [];

      this.caremarkDataService.getOrderStatus().then((ordersResponse: any) => {
        const orders = ordersResponse.Results;

        for (const order of orders) {
          const orderStatusDetail: any = {};

          orderStatusDetail.OrderDate = order.OrderDate;
          orderStatusDetail.OrderNumber = order.OrderNumber;
          orderStatusDetail.OrderType = order.OrderType;
          // Order Status takes priority of prescription on hold otherwise first prescriotion status
          if (order.PrescriptionList) {

            orderStatusDetail.OrderStatusCode = order.PrescriptionList[0].StatusReasonCode;
            orderStatusDetail.OrderStatus = order.PrescriptionList[0].Status;
            orderStatusDetail.OrderStatusDescription = order.PrescriptionList[0].StatusDescription;
            orderStatusDetail.OrderedFor = order.PrescriptionList[0].PatientFirstName + ' ' + order.PrescriptionList[0].PatientLastName;
            orderStatusDetail.RxFills = order.PrescriptionList.length;
            orderStatusDetail.DoctorFullName = order.PrescriptionList[0].DoctorFullName;
            orderStatusDetail.DrugName = order.PrescriptionList[0].DrugName;
            orderStatusDetail.DrugDosage = order.PrescriptionList[0].DrugDosage;
            orderStatusDetail.DrugStrength = order.PrescriptionList[0].DrugStrength;
            for (const prescription of order.PrescriptionList) {
              if (prescription.StatusDescription &&
                prescription.StatusDescription.toUpperCase() === OrderStatusService.ORDER_STATUS_HOLD_TEXT.toUpperCase()) {
                orderStatusDetail.DoctorFullName = prescription.DoctorFullName;
                orderStatusDetail.DrugName = prescription.DrugName;
                orderStatusDetail.DrugDosage = prescription.DrugDosage;
                orderStatusDetail.DrugStrength = prescription.DrugStrength;
                orderStatusDetail.OrderStatus = prescription.Status;
                orderStatusDetail.OrderStatusDescription = prescription.StatusDescription;
                orderStatusDetail.OrderedFor = prescription.PatientFirstName + ' ' + prescription.PatientLastName;
                break;
              }
            }
          }

          if (orderStatusDetail.OrderStatusCode && ORDER_STATUS_CODES_MAP[orderStatusDetail.OrderStatusCode]) {
            orderStatusDetail.OrderStatus = ORDER_STATUS_CODES_MAP[orderStatusDetail.OrderStatusCode].RxStatus;
            orderStatusDetail.OrderStatusDescription = ORDER_STATUS_CODES_MAP[orderStatusDetail.OrderStatusCode].RxStatusDescription;
            orderStatusDetail.OrderPriority = ORDER_STATUS_CODES_MAP[orderStatusDetail.OrderStatusCode].ReasonCodePriority;
            // console.log(JSON.stringify(orderStatusDetail));
          }


          if (order.OrderType && order.OrderType.toUpperCase() === 'FastStart'.toUpperCase()) {
            if (order.PrescriptionList) {
              orderStatusDetail.OrderStatus = FASTSTART_ORDER_STATUS_MAP[order.PrescriptionList[0].Status];
            }
            if (!orderStatusDetail.OrderStatus) {
              orderStatusDetail.OrderStatus = FASTSTART_ORDER_STATUS.FASTSTART_STATUS_DEFAULT;
            }
            orderStatusDetail.OrderNumber = 'not assigned yet';
          }
          // Skip Orders when No Rxs
          if (!orderStatusDetail.RxFills) {
            continue;
          }
          // console.log(JSON.stringify(orderStatusDetail));
          recentOrders.push(orderStatusDetail);
        }
      }).catch((error) => {
        console.error('Failed to get WidgetData in OrderStatus');
        console.error(JSON.stringify(error));
        recentOrders = [];
      }).then(() => {
        resolve(recentOrders);
      });
    });
  }

  public getRecentOrdersOnHold() {

    return new Promise((resolve, reject) => {
      let holdOrders: OrderStatus[] = [];

      this.getRecentOrders().then((orders: OrderStatus[]) => {
        for (const order of orders) {
          if (ORDER_STATUS_CODES_ON_HOLD.includes(order.OrderStatusCode) ) {
            holdOrders.push(order);
          }
        }
      }).catch((error) => {
        console.error('Failed to getRecentOrders');
        holdOrders = [];
      }).then (() => { resolve(holdOrders); });
    });
  }

}
