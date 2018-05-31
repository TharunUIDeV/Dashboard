import {Component, OnInit} from '@angular/core';
import {TealiumUtagService} from '../service/utag.service';
import {ConfigService} from '../service/config.service';
import {OrderStatusService} from '../order-status/order-status.service';
import {OrderStatus} from '../order-status/order-status.interface';
import {ORDER_STATUS_TYPES} from '../order-status/order-status.constants';

interface RecentOrdersWidgetData {
  OrdersCount: number;
  Orders: OrderStatus[];
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
  public recentOrders: RecentOrdersWidgetData = {OrdersCount: undefined, Orders: []};
  public ORDER_STATUS_HOLD_TEXT = 'On Hold';
  public loading = true;

  constructor(private analytics: TealiumUtagService,
              private configSvc: ConfigService,
              private orderStatusService: OrderStatusService) {
  }

  public isFastStartOrder(order) {
    if (order && order.OrderType.toUpperCase() === ORDER_STATUS_TYPES.FAST_ORDER ) {
      return true;
    }
    return false;
  }

  public getWidgetData() {
    this.orderStatusService.getRecentOrders().then((orders: OrderStatus[]) => {
      if (orders && (orders.length !== undefined) ) {
        // console.log(orders);
        this.recentOrders.OrdersCount = orders.length;
        this.recentOrders.Orders = orders;
      }
    }).catch((error) => {
      console.error('Failed to get WidgetData in attention');
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

  orderNumberClick(OrderNumber) {
    window.parent.location.href = this.configSvc.orderStatusUrl + '?OrderNumber=' + OrderNumber;
  }
}
