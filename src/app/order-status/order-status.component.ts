import {Component, OnInit} from '@angular/core';
import {TealiumUtagService} from '../service/utag.service';
import {ConfigService} from "../service/config.service";
import {OrderStatusWidgetElement, OrderStatusService} from './order-status.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit{
  public ORDER_STATUS_TEXT = 'Recent Orders';
  public ORDER_STATUS_HREF_TEXT = 'View orders';
  public orderStatusWT: any;
  public OrderStatusList: OrderStatusWidgetElement[] = [];

  constructor(private analytics: TealiumUtagService,
              private configSvc: ConfigService,
              private orderStatusService: OrderStatusService) { }

  ngOnInit(): void {
    this.orderStatusService.getWidgetData().then((widgetdata: OrderStatusWidgetElement[]) => {
      console.log('Component: Then');
      this.OrderStatusList = widgetdata;
    }).catch((error) => {
      console.log(JSON.stringify(error));
      this.OrderStatusList = [];
    });
  }

  orderClickTag() {
    this.orderStatusWT = this.analytics.link({
      key_activity: 'new dashboard view orders',
      link_name: 'Custom: New Dashboard view orders clicked'
    });
    window.parent.location.href = this.configSvc.orderStatusUrl;

  }
}
