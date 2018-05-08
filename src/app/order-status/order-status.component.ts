import {Component, OnInit} from '@angular/core';
import {TealiumUtagService} from '../service/utag.service';
import {ConfigService} from "../service/config.service";
import {OrderStatusElement, OrderStatusWidgetService} from './order-status.widget.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit{
  public ORDER_STATUS_TEXT = 'Recent Orders';
  public ORDER_STATUS_HREF_TEXT = 'View orders';
  public orderStatusWT: any;
  public OrderStatusList: OrderStatusElement[] = [];

  constructor(private analytics: TealiumUtagService,
              private configSvc: ConfigService,
              private orderStatusWidgetService: OrderStatusWidgetService) { }

  ngOnInit(): void {
    this.orderStatusWidgetService.getWidgetData().then((widgetdata: OrderStatusElement[]) => {
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
