import {Component, OnInit} from '@angular/core';
import {TealiumUtagService} from '../service/utag.service';
import {ConfigService} from '../service/config.service';
import {CaremarkSdkService} from '../service/caremark-sdk.service';

interface OrderStatusWidgetElement {
  OrderNumber: string;
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
  public ORDER_STATUS_HREF_TEXT = 'View orders';
  public orderStatusWT: any;
  public OrderStatusList: OrderStatusWidgetElement[] = [];

  constructor(private analytics: TealiumUtagService,
              private configSvc: ConfigService,
              private caremarkSdkService: CaremarkSdkService) { }

  public getWidgetData() {
    this.caremarkSdkService.getOrderStatus().then((historyStatus: any) => {
      for (const history of historyStatus.Results) {
        this.OrderStatusList.push({
          OrderNumber: history.OrderNumber,
          OrderedFor: history.OrderDate,
          RxFills: history.PrescriptionList !== undefined ? history.PrescriptionList[0].RxFillList.length : 'No Rx',
          StatusDescription: history.PrescriptionList !== undefined ? history.PrescriptionList[0].StatusDescription : 'Unknown'
        });
      }
    }).catch((error) => {
        console.error('Failed to get WidgetData');
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
