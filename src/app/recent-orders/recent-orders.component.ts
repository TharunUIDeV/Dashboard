import {Component, OnInit} from '@angular/core';
import {TealiumUtagService} from '../service/utag.service';
import {ConfigService} from '../service/config.service';
import {CaremarkDataService} from '../service/caremark-data.service';
import {OrderStatusFilterPipe} from './order-status-filter.pipe';
import {
  FASTSTART_ORDER_STATUS_MAP,
  FASTSTART_ORDER_STATUS,
  FASTSTART_ORDER_STATUS_DESCRIPTION,
  ORDER_STATUS_CODES_MAP
} from './order-status.constants';

interface RecentOrdersWidgetData {
  OrdersCount: number;
  Orders: OrderStatusDetail [];
}

interface OrderStatusDetail {
  OrderNumber: string;
  OrderDate: string;
  OrderedFor: string;
  RxFills: number;
  OrderPriority: string;
  OrderType: string;
  OrderStatus: string;
  OrderStatusCode: string;
  OrderStatusDescription: string;
}

@Component({
  selector: 'app-order-status',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.scss']
})
export class RecentOrdersComponent implements OnInit {
  public RECENT_ORDERS_TEXT = 'Recent Orders';
  public ORDER_STATUS_HREF_TEXT = 'View all orders';
  public ORDERED_FOR_PREFIX = 'For ';
  public orderStatusWT: any;
  public recentOrdersWidgetData: RecentOrdersWidgetData = {OrdersCount: undefined, Orders: []};
  public ORDER_STATUS_HOLD_TEXT = 'On Hold';
  public loading = true;

  constructor(private analytics: TealiumUtagService,
              private configSvc: ConfigService,
              private caremarkDataService: CaremarkDataService,
              private orderStatusFilter: OrderStatusFilterPipe) {
  }

  public getWidgetData() {
    this.caremarkDataService.getOrderStatus().then((historyStatus: any) => {
      let orders = historyStatus.Results;
      orders = this.orderStatusFilter.transform(orders);

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
          for (const prescription of order.PrescriptionList) {
            if (prescription.StatusDescription &&
              prescription.StatusDescription.toUpperCase() === this.ORDER_STATUS_HOLD_TEXT.toUpperCase()) {
              orderStatusDetail.OrderStatus = prescription.Status;
              orderStatusDetail.OrderStatusDescription = prescription.StatusDescription;
              orderStatusDetail.OrderedFor = prescription.PatientFirstName + ' ' + prescription.PatientLastName;
              break;
            }
          }
        }

        if (orderStatusDetail.OrderedFor) {
          orderStatusDetail.OrderedFor = this.ORDERED_FOR_PREFIX + orderStatusDetail.OrderedFor;
        }

        if (orderStatusDetail.OrderStatusCode && ORDER_STATUS_CODES_MAP[orderStatusDetail.OrderStatusCode]) {
          orderStatusDetail.OrderStatus = ORDER_STATUS_CODES_MAP[orderStatusDetail.OrderStatusCode].RxStatus;
          orderStatusDetail.OrderStatusDescription = ORDER_STATUS_CODES_MAP[orderStatusDetail.OrderStatusCode].RxStatusDescription;
          orderStatusDetail.OrderPriority = ORDER_STATUS_CODES_MAP[orderStatusDetail.OrderStatusCode].ReasonCodePriority;
          console.log(JSON.stringify(orderStatusDetail));
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
        this.recentOrdersWidgetData.Orders.push(orderStatusDetail);
      }
      this.recentOrdersWidgetData.OrdersCount = this.recentOrdersWidgetData.Orders.length;
    }).catch((error) => {
      console.error('Failed to get WidgetData in OrderStatus');
      console.error(JSON.stringify(error));
      this.recentOrdersWidgetData = {OrdersCount: undefined, Orders: []};
    }).then(() => {
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.getWidgetData();
  }

  orderClickTag() {
    this.orderStatusWT = this.analytics.link({
      key_activity: 'new dashboard view orders',
      link_name: 'Custom: New Dashboard view orders clicked'
    });
    window.parent.location.href = this.configSvc.orderStatusUrl;

  }

  orderNumberClick(OrderNumber) {
    window.parent.location.href = this.configSvc.orderStatusUrl + '?OrderNumber=' + OrderNumber;
  }
}
