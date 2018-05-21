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
  RxFills: string;
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
  public orderStatusWidgetData: OrderStatusWidgetData = {OrdersCount: 0, Orders: []};

  constructor(private analytics: TealiumUtagService,
              private configSvc: ConfigService,
              private caremarkDataService: CaremarkDataService) { }

  public getWidgetData() {
    this.caremarkDataService.getOrderStatus().then((historyStatus: any) => {
      for (const history of historyStatus.Results) {
        this.orderStatusWidgetData.Orders.push({
          OrderNumber: history.OrderNumber,
          OrderDate: history.OrderDate,
          OrderedFor: history.PrescriptionList !== undefined ?
              history.PrescriptionList[0].PatientFirstName + ' ' + history.PrescriptionList[0].PatientLastName :  undefined,
          RxFills: history.PrescriptionList !== undefined ?
              history.PrescriptionList[0].RxFillList.length : undefined,
          StatusDescription: history.PrescriptionList !== undefined ?
              history.PrescriptionList[0].StatusDescription : undefined
        });
      }
      this.orderStatusWidgetData.OrdersCount = this.orderStatusWidgetData.Orders.length;
    }).catch((error) => {
        console.error('Failed to get WidgetData in OrderStatus');
        console.error(JSON.stringify(error));
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
}
