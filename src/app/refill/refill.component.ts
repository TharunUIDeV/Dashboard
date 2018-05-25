import {Component, OnInit} from '@angular/core';
import {TealiumUtagService} from '../service/utag.service';

import {ConfigService} from '../service/config.service';
import {CaremarkDataService} from '../service/caremark-data.service';

interface RefillWidgetData {
  RefillPrescriptionCount: number;
}

@Component({
  selector: 'app-refill',
  templateUrl: './refill.component.html',
  styleUrls: ['./refill.component.scss']
})
export class RefillComponent implements  OnInit {
  public REFILL_URL_TEXT = 'Prescriptions Ready For Refill';
  // public REFILL_URL_TEXT = 'View prescriptions';
  public webTrends: any;
  public refillWidgetData: RefillWidgetData = { RefillPrescriptionCount: undefined};
  public loading = true;


  constructor(private analytics: TealiumUtagService, private configSvc: ConfigService, private caremarkDataService: CaremarkDataService) { }


  public getWidgetData() {
    this.caremarkDataService.getRefills().then((refillsData: any) => {
      let refill_count = 0;
      for (const member of refillsData) {
        for (const rxRefill of member.rxRefills) {
          if (rxRefill.canAutoRefill && rxRefill.tooSoonToRefill !== false) {
            refill_count = refill_count + 1;
          }
        }
      }
      this.refillWidgetData.RefillPrescriptionCount = refill_count;
    }).catch((error) => {
      console.error('Failed to get WidgetData');
      console.error(JSON.stringify(error));
      this.refillWidgetData.RefillPrescriptionCount = undefined;
    }).then (() => { this.loading = false; });
  }

  ngOnInit(): void {
    this.getWidgetData();
  }

  refillClickTag() {
    this.webTrends = this.analytics.link({
      key_activity: 'new dashboard view prescriptions',
      link_name: 'Custom: New Dashboard view prescriptions clicked'
    });
    window.parent.location.href = this.configSvc.refillRxUrl;
  }
}
