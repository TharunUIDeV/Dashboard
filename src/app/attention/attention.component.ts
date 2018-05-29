import { Component, OnInit } from '@angular/core';
import {TealiumUtagService} from '../service/utag.service';
import {ConfigService} from '../service/config.service';
import {CaremarkDataService} from '../service/caremark-data.service';
import {OrderStatusService} from '../order-status/order-status.service';

interface AttentionWidgetData {
  Orders: OrderStatus[];
}

@Component({
  selector: 'app-attention',
  templateUrl: './attention.component.html',
  styleUrls: ['./attention.component.css']
})
export class AttentionComponent implements OnInit {
  public attentionData: AttentionWidgetData = { Orders: []};
  public ORDER_HOLD_STATUS_TEXT = 'On Hold';
  public loading = true;

  constructor(private analytics: TealiumUtagService,
              private configSvc: ConfigService,
              private orderStatusService: OrderStatusService) { }

  public getWidgetData() {
    this.orderStatusService.getRecentOrders().then((orders: OrderStatus[]) => {
      if (orders && orders.length) {
        this.attentionData.Orders = orders;
      }
    }).catch((error) => {
      console.error('Failed to get WidgetData in attention');
      console.error(JSON.stringify(error));
    }).then (() => { this.loading = false; });
  }

  ngOnInit(): void {
    this.getWidgetData();
  }

  orderNumberClick(OrderNumber) {
    window.parent.location.href = this.configSvc.orderStatusUrl + '?OrderNumber=' + OrderNumber;
  }

}
