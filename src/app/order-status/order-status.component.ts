import { Component, OnInit } from '@angular/core';
import {TealiumUtagService} from '../service/utag.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  public ORDER_STATUS_TEXT = 'Recent Orders';
  public ORDER_STATUS_HREF_TEXT = 'View orders';
  public orderStatusWT: any;
  constructor(private analytics: TealiumUtagService) { }

  ngOnInit() {
    this.orderStatusWT = this.analytics.link({
      key_activity: 'new dashboard view orders',
      link_name: 'Custom: New Dashboard view orders clicked'
    });
  }

  loadOS() {
    window.parent.location.href = "/wps/myportal/ORDER_STATUS";
  }
}
