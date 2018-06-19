import {Component, OnInit} from '@angular/core';
import {TealiumUtagService} from '../service/utag.service';
import {ConfigService} from '../service/config.service';
import {OrderStatusService} from '../order-status/order-status.service';
import {OrderStatus} from '../order-status/order-status.interface';
import {ORDER_STATUS_TYPES} from '../order-status/order-status.constants';
import {EccrService} from '../service/eccr.service';

interface AttentionWidgetData {
  Orders: OrderStatus[];
}

@Component({
  selector: 'app-attention',
  templateUrl: './attention.component.html',
  styleUrls: ['./attention.component.css']
})
export class AttentionComponent implements OnInit {
  public attentionData: AttentionWidgetData = {Orders: []};

  public loading = true;
  public ORDER_STATUS_HREF_TEXT = 'View all orders';

  constructor(private analytics: TealiumUtagService,
              private configSvc: ConfigService,
              private orderStatusService: OrderStatusService,
              private eccrService: EccrService) {
  }

  public getWidgetData() {
    const additionalData = [
      { key: 'ORDER_NUM', value: 'TEST' },
      { key: 'FAST_STYLE', value: 'FASTINT' },
      { key: 'FAST_INDICATOR', value: 'CAREMARK' }
    ];
    this.eccrService.log('3225', 'Completed', this.configSvc.token, additionalData);
    this.orderStatusService.getRecentOrdersOnHold().then((orders: OrderStatus[]) => {
      if (orders && orders.length) {
        this.attentionData.Orders = orders;
      }
    }).catch((error) => {
      console.error('Failed to get WidgetData in attention');
      console.error(JSON.stringify(error));
    }).then(() => {
      this.loading = false;
    });
  }

  public getOrderNumberFormatted(order: OrderStatus) {
    if (this.isFastStartOrder(order)) {
      return 'not assigned';
    }
    return order.OrderNumber;
  }

  public isFastStartOrder(order) {
    if (order && order.OrderType.toUpperCase() === ORDER_STATUS_TYPES.FAST_ORDER) {
      return true;
    }
    return false;
  }

  ngOnInit(): void {
    this.getWidgetData();
  }

  orderClickTag() {
    window.parent.location.href = this.configSvc.orderStatusUrl;
  }

  orderNumberClick(OrderNumber) {
    this.analytics.link({
      key_activity: 'new dashboard your tasks view order',
      link_name: 'Custom: New Dashboard your task view order clicked'
    });
    window.parent.location.href = this.configSvc.orderStatusUrl + '?scrollId=' + OrderNumber;
  }

}
