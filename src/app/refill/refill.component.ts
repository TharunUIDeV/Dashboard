import {Component, OnInit} from '@angular/core';
import {TealiumUtagService} from '../service/utag.service';

import {ConfigService} from '../service/config.service';
import {CaremarkDataService} from '../service/caremark-data.service';

interface RefillWidgetData {
  RefillPrescriptionCount: string;
}

@Component({
  selector: 'app-refill',
  templateUrl: './refill.component.html',
  styleUrls: ['./refill.component.scss']
})
export class RefillComponent implements  OnInit {
  public REFILL_TEXT = 'Prescriptions ready for refill';
  public REFILL_URL_TEXT = 'View prescriptions';
  public webTrends: any;
  public refillWidgetData: RefillWidgetData = { RefillPrescriptionCount: '0'};


  constructor(private analytics: TealiumUtagService, private configSvc: ConfigService, private caremarkDataService: CaremarkDataService) { }

  ngOnInit(): void {
    this.caremarkDataService.getRefills()
      .then((refills) => {
        console.error('TODO: add refills count here');
        this.refillWidgetData.RefillPrescriptionCount = '0';
        console.log(JSON.stringify(refills)); })
      .catch( (error) => {
        console.error(error);
      });
  }

  refillClickTag() {
    this.webTrends = this.analytics.link({
      key_activity: 'new dashboard view prescriptions',
      link_name: 'Custom: New Dashboard view prescriptions clicked'
    });
    window.parent.location.href = this.configSvc.refillRxUrl;
  }
}
