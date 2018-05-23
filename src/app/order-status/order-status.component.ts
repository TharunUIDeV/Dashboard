import {Component, OnInit} from '@angular/core';
import {TealiumUtagService} from '../service/utag.service';
import {ConfigService} from '../service/config.service';
import {CaremarkDataService} from '../service/caremark-data.service';

interface OrderStatusWidgetData {
  OrdersCount: number;
  Orders: OrderStatusDetail [];
}

interface OrderStatusDetail {
  OrderNumber: string;
  OrderDate: string;
  OrderedFor: string;
  RxFills: number;
  StatusDescription: string;
}

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  public ORDER_STATUS_TEXT = 'Recent Orders';
  public ORDER_STATUS_HREF_TEXT = 'View all orders';
  public orderStatusWT: any;
  public orderStatusWidgetData: OrderStatusWidgetData = {OrdersCount: undefined, Orders: []};
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
        // Order Status takes priority of prescription on hold otherwise first prescriotion status
        if (history.PrescriptionList) {
          orderStatusDetail.StatusDescription = history.PrescriptionList[0].StatusDescription;
          orderStatusDetail.OrderedFor = history.PrescriptionList[0].PatientFirstName + ' ' +  history.PrescriptionList[0].PatientLastName;
          orderStatusDetail.RxFills = history.PrescriptionList.length;
          for (const prescription of history.PrescriptionList) {
            if (prescription.StatusDescription.toUpperCase() === this.ORDER_STATUS_HOLD_TEXT.toUpperCase()) {
              orderStatusDetail.StatusDescription = this.ORDER_STATUS_HOLD_TEXT;
              orderStatusDetail.OrderedFor = prescription.PatientFirstName + ' ' + prescription.PatientLastName;
              break;
            }
          }
        } else {
          orderStatusDetail.StatusDescription = undefined;
          orderStatusDetail.OrderedFor = undefined;
          orderStatusDetail.RxFills = 0;
        }
        this.orderStatusWidgetData.Orders.push(orderStatusDetail);
      }
      this.orderStatusWidgetData.OrdersCount = this.orderStatusWidgetData.Orders.length;
    }).catch((error) => {
        console.error('Failed to get WidgetData in OrderStatus');
        console.error(JSON.stringify(error));
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
