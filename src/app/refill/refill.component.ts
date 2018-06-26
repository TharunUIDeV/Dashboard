import {Component, OnInit} from '@angular/core';
import {TealiumUtagService} from '../service/utag.service';

import {ConfigService} from '../service/config.service';
import {CaremarkDataService} from '../service/caremark-data.service';
import {PZN_CONSTANTS} from '../order-status/personalization.constants';
import {Observable} from 'rxjs/Observable';
import {initialRefillsCountState, RefillsCountState} from '../store/refills-count/refills-count.reducer';
import {Store} from '@ngrx/store';
import {RefillsCountFetch} from '../store/refills-count/refills-count.actions';

interface RefillWidgetData {
  RefillAvailableCount: string;
  ShowCDC: boolean;
}

@Component({
  selector: 'app-refill',
  templateUrl: './refill.component.html',
  styleUrls: ['./refill.component.scss']
})
export class RefillComponent implements  OnInit {
  public REFILL_URL_TEXT = 'Prescription Ready For Refill';
  public REFILLS_URL_TEXT = 'Prescriptions Ready For Refill';
  public webTrends: any;
  public refillWidgetData: RefillWidgetData = { RefillAvailableCount: undefined, ShowCDC: false};
  public loading = true;
  public refillsCount$: Observable<RefillsCountState>;
  public refillsCount: RefillsCountState = initialRefillsCountState;


  constructor(private analytics: TealiumUtagService,
              private configSvc: ConfigService,
              private caremarkDataService: CaremarkDataService,
              private store: Store<any>) {
    this.refillsCount$ = this.store.select('refillsCountState');
  }


  public getRefillCount() {
    this.caremarkDataService.getRefillsCount().then((refillsData: any) => {
      // console.log(JSON.stringify(refillsData));
      this.refillWidgetData.RefillAvailableCount = refillsData.refillsAvailable;
    }).catch((error) => {
      console.error('Failed to get WidgetData');
      console.error(JSON.stringify(error));
      this.refillWidgetData.RefillAvailableCount = undefined;
      this.refillWidgetData.ShowCDC = false;
    }).then (() => { this.loading = false; });
  }

  getCDCVersion() {

    const params = {
      pznId: this.configSvc.pznId,
      resourceTags: [PZN_CONSTANTS.PZN_CDC_FAST_VERSION_RESOURCE_TAG]
    };

    this.caremarkDataService.getPznByIdAndResource(params).then((result) => {
      if (result && Array.isArray(result)) {
        result.forEach(pznContent => {
          if ( (pznContent.resourceTagId === PZN_CONSTANTS.PZN_CDC_FAST_VERSION_RESOURCE_TAG)  &&
          (pznContent.resourceContentId === PZN_CONSTANTS.PZN_CDC_FAST_VERSION_CONTENT_ID) ) {
            this.refillWidgetData.ShowCDC = parseInt(pznContent.resourceVisibleIndicator, 10)  === 1;
          }
        });
      } else if (result && result.resourceTagId === PZN_CONSTANTS.PZN_CDC_FAST_VERSION_RESOURCE_TAG  &&
                result.resourceContentId === PZN_CONSTANTS.PZN_CDC_FAST_VERSION_CONTENT_ID ) {
        // console.log(JSON.stringify(result));
        this.refillWidgetData.ShowCDC = parseInt(result.resourceVisibleIndicator, 10) === 1;

      } else {
        console.error('Wrong response');
      }
    }).catch((error) => {
      console.error('Failed to get PZN data');
    });
}

  public getWidgetData() {
    this.getCDCVersion();
    this.store.dispatch(new RefillsCountFetch());
    this.refillsCount$.subscribe((r) => {
      this.refillsCount = r;
      this.refillWidgetData.RefillAvailableCount = r.RefillAvailableCount ? r.RefillAvailableCount.toString() : undefined;
      this.loading = r.loading;
    });
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

  rxHistoryClickTag() {
    this.analytics.link({
      key_activity: 'new dashboard view past prescriptions',
      link_name: 'Custom: New Dashboard view past prescriptions clicked'
    });
    window.parent.location.href = this.configSvc.rxHistoryUrl;
  }

  findNewMedication() {
    window.parent.location.href = this.configSvc.checkDrugCostFastUrl;
  }

  getRefillUrlFormatted (refillsCount: string) {

    if (refillsCount !== undefined) {
       return parseInt(refillsCount, 10) === 1 ? this.REFILL_URL_TEXT : this.REFILLS_URL_TEXT;
    }
    return this.REFILLS_URL_TEXT;

  }
}
