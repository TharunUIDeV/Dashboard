import {Component, OnInit} from '@angular/core';
import {TealiumUtagService} from '../service/utag.service';

import {ConfigService} from '../service/config.service';
import {CaremarkSdkService} from '../service/caremark-sdk.service';

@Component({
  selector: 'app-refill',
  templateUrl: './refill.component.html',
  styleUrls: ['./refill.component.scss']
})
export class RefillComponent implements  OnInit {
  public REFILL_TEXT = 'Your Prescriptions';
  public REFILL_URL_TEXT = 'View prescriptions';
  public webTrends: any;


  constructor(private analytics: TealiumUtagService, private configSvc: ConfigService, private caremarkSdkService: CaremarkSdkService) { }

  ngOnInit(): void {
    this.caremarkSdkService.getRefills()
      .then((refills) => {console.log(JSON.stringify(refills)); })
      .catch( (error) => console.error(error));
  }

  refillClickTag() {
    this.webTrends = this.analytics.link({
      key_activity: 'new dashboard view prescriptions',
      link_name: 'Custom: New Dashboard view prescriptions clicked'
    });
    window.parent.location.href = this.configSvc.refillRxUrl;
  }
}
