import {Component, OnInit} from '@angular/core';
import {TealiumUtagService} from '../service/utag.service';
import {ConfigService} from '../service/config.service';
import {CaremarkDataService} from '../service/caremark-data.service';

interface RecentOrdersWidgetData {
  OrdersCount: number;
  Orders: OrderStatusDetail [];
}

interface OrderStatusDetail {
  OrderNumber: string;
  OrderDate: string;
  OrderedFor: string;
  RxFills: number;
  OrderStatus: string;
  OrderType: string;
}

@Component({
  selector: 'app-order-status',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.scss']
})
export class RecentOrdersComponent implements OnInit {
  public RECENT_ORDERS_TEXT = 'Recent Orders';
  public ORDER_STATUS_HREF_TEXT = 'View all orders';
  public orderStatusWT: any;
  public recentOrdersWidgetData: RecentOrdersWidgetData = {OrdersCount: undefined, Orders: []};
  public ORDER_STATUS_HOLD_TEXT = 'On Hold';
  public loading = true;

  constructor(private analytics: TealiumUtagService,
              private configSvc: ConfigService,
              private caremarkDataService: CaremarkDataService) { }

  public getWidgetData() {
    this.caremarkDataService.getOrderStatus().then((historyStatus: any) => {
      for (const history of historyStatus.Results) {
        const orderStatusDetail: any = {};

        orderStatusDetail.OrderDate = history.OrderDate;
        orderStatusDetail.OrderNumber = history.OrderNumber;
        orderStatusDetail.OrderType = history.OrderType;
        // Order Status takes priority of prescription on hold otherwise first prescriotion status
        if (history.PrescriptionList) {
          orderStatusDetail.OrderStatus = history.PrescriptionList[0].Status;
          orderStatusDetail.OrderedFor = history.PrescriptionList[0].PatientFirstName + ' ' +  history.PrescriptionList[0].PatientLastName;
          orderStatusDetail.RxFills = history.PrescriptionList.length;
          for (const prescription of history.PrescriptionList) {
            if (prescription.Status.toUpperCase() === this.ORDER_STATUS_HOLD_TEXT.toUpperCase()) {
              orderStatusDetail.OrderStatus = this.ORDER_STATUS_HOLD_TEXT;
              orderStatusDetail.OrderedFor = prescription.PatientFirstName + ' ' + prescription.PatientLastName;
              break;
            }
          }
        } else {
          orderStatusDetail.OrderStatus = undefined;
          orderStatusDetail.OrderedFor = undefined;
          orderStatusDetail.RxFills = 0;
        }
        console.log(JSON.stringify(orderStatusDetail));
        this.recentOrdersWidgetData.Orders.push(orderStatusDetail);
      }
      this.recentOrdersWidgetData.OrdersCount = this.recentOrdersWidgetData.Orders.length;
    }).catch((error) => {
        console.error('Failed to get WidgetData in OrderStatus');
        console.error(JSON.stringify(error));
        this.recentOrdersWidgetData = {OrdersCount: undefined, Orders: []};
    }).then (() => { this.loading = false; });
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
}
