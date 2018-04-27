import { Component, OnInit } from '@angular/core';
import {TealiumUtagService} from '../service/utag.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  public ORDER_STATUS_TEXT = 'View Orders';
  public orderStatusWT: any;
  constructor(private analytics: TealiumUtagService) { }

  ngOnInit() {
    this.orderStatusWT = this.analytics.link({
      key_activity: 'new dashboard view orders',
      link_name: 'Custom: New Dashboard view orders clicked'
    });
  }
}
