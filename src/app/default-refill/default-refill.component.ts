import {Component} from '@angular/core';
import {TealiumUtagService} from '../service/utag.service';
import {ConfigService} from '../service/config.service';

@Component({
  selector: 'app-default-refill',
  templateUrl: './default-refill.component.html',
  styleUrls: ['./default-refill.component.scss']
})
export class DefaultRefillComponent {
  public REFILL_TEXT = 'Your Prescriptions';
  public REFILL_URL_TEXT = 'View prescriptions';
  public webTrends: any;

  constructor(private analytics: TealiumUtagService, private configSvc: ConfigService) { }

  refillClickTag() {
    this.webTrends = this.analytics.link({
      key_activity: 'new dashboard view prescriptions',
      link_name: 'Custom: New Dashboard view prescriptions clicked'
    });
    window.parent.location.href = this.configSvc.refillRxUrl;
  }
}
