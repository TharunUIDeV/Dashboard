import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../service/config.service';
import {Store} from '@ngrx/store';
import {CdcHelperService} from './cdc-helper.service';
import {CaremarkDataService} from '../service/caremark-data.service';
import {TealiumUtagService} from '../service/utag.service';

@Component({
  selector: 'app-cdc-search',
  templateUrl: './cdc-search.component.html',
  styleUrls: ['./cdc-search.component.css']
})
export class CdcSearchComponent implements OnInit {

  constructor(private analytics: TealiumUtagService,
  private configSvc: ConfigService,
  private caremarkDataService: CaremarkDataService,
  private cdcHelperService: CdcHelperService,
  private store: Store<any>) { }

  ngOnInit() {
  }

  findNewMedication() {
    this.analytics.link({
      key_activity: 'new dashboard find a new medication',
      link_name: 'Custom: New Dashboard find a new medication clicked'
    });
    this.cdcHelperService.setSessionData();
  }

}
