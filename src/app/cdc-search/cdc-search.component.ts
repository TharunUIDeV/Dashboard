import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../service/config.service';
import {CdcHelperService} from './cdc-helper.service';
import {CaremarkDataService} from '../service/caremark-data.service';
import {TealiumUtagService} from '../service/utag.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {of} from 'rxjs/observable/of';

@Component({
  selector: 'app-cdc-search',
  templateUrl: './cdc-search.component.html',
  styleUrls: ['./cdc-search.component.css']
})
export class CdcSearchComponent implements OnInit {

  searching = false;
  searchFailed = false;
  constructor(private analytics: TealiumUtagService,
              private configSvc: ConfigService,
              private caremarkDataService: CaremarkDataService,
              private cdcHelperService: CdcHelperService) { }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        fromPromise(this.caremarkDataService.getDrugByName(term)).pipe(
          tap(() => {this.searchFailed = false; }),
          map( (drugs) => drugs.map(drug => drug.drugName + ' ' + drug.drugStrength)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

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
