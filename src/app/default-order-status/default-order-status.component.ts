import {Component} from '@angular/core';
import {TealiumUtagService} from '../service/utag.service';
import {ConfigService} from '../service/config.service';

@Component({
  selector: 'app-default-order-status',
  templateUrl: './default-order-status.component.html',
  styleUrls: ['./default-order-status.component.scss']
})
export class DefaultOrderStatusComponent {
  public ORDER_STATUS_TEXT = 'Recent Orders';
  public ORDER_STATUS_HREF_TEXT = 'View orders';
  public orderStatusWT: any;

  constructor(private analytics: TealiumUtagService, private configSvc: ConfigService) { }

  orderClickTag() {
    this.orderStatusWT = this.analytics.link({
      key_activity: 'new dashboard view orders',
      link_name: 'Custom: New Dashboard view orders clicked'
    });
    window.parent.location.href = this.configSvc.orderStatusUrl;

  }
}
