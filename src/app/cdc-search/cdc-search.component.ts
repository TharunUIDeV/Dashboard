import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../service/config.service';
import {CdcHelperService} from './cdc-helper.service';
import {CaremarkDataService} from '../service/caremark-data.service';
import {TealiumUtagService} from '../service/utag.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {of} from 'rxjs/observable/of';
import {NgForm} from '@angular/forms';
import {MemberService} from '../service/member.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FastWidgetTypes} from '../fast-widgets/fast-widgets.component';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-cdc-search',
  templateUrl: './cdc-search.component.html',
  styleUrls: ['./cdc-search.component.css']
})
export class CdcSearchComponent implements OnInit {

  searching = false;
  searchFailed = false;
  drugSearched = '';
  private drugSearch$;
  private drugSelected;
  private drugCache = {};
  private defaultPharmacy = undefined;
  private memberInfo = undefined;
  private currentSearch: any = {};
  constructor(private analytics: TealiumUtagService,
              private configSvc: ConfigService,
              private caremarkDataService: CaremarkDataService,
              private cdcHelperService: CdcHelperService,
              private memberService: MemberService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<any>) {
    this.drugSearch$ = this.store.select('drugSearchState');
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((term) => {
        this.searching = true;
        this.drugSearched = term;
      }),
      switchMap(term =>
        this.cdcHelperService.drugSearch(term).pipe(
          tap( (drugs) => {
            this.searchFailed = false;
            this.cdcHelperService.cachedrugSearchResults(term, drugs);
          }),
          map( (drugs) =>  drugs.map(drug => {
            let drugKey = this.cdcHelperService.getDrugName(drug);
            drugKey = this.cdcHelperService.transformTitleCase(drugKey);
            // console.log(drugKey);
            this.drugCache[drugKey] = drug;
            return drugKey;
          })),
          map((drugNames) => drugNames.filter( (drugName) => {
            return (  drugName.toLowerCase().indexOf(term.toLowerCase()) === 0);
          }) ),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  ngOnInit() {
    this.caremarkDataService.getDefaultPharmacy().then((result) => {
      // console.log(result);
      this.defaultPharmacy = result;
    });
    this.memberService.getMemberDetailsLegacy().then((result) => {
        this.memberInfo = result;
        this.cdcHelperService.setMemberDetails(this.memberInfo);
        this.cdcHelperService.setMemberList(this.memberInfo);
      }
    );
  }

  findNewMedication() {
    this.analytics.link({
      key_activity: 'new dashboard find a new medication',
      link_name: 'Custom: New Dashboard find a new medication clicked'
    });
  }

  onSubmit(form: NgForm) {
    // console.log(this.drugSelected);
    this.currentSearch.userName = this.memberInfo;
    this.currentSearch.pharmacy = this.cdcHelperService.setPharmacyDetail(this.defaultPharmacy);
    this.currentSearch.drugDetails = this.cdcHelperService.getDrugData(this.drugCache[this.drugSelected]);
    this.currentSearch.drugName = this.cdcHelperService.getDrugName(this.currentSearch.drugDetails);
    // console.log(this.currentSearch);
    this.cdcHelperService.setSessionData(this.currentSearch);
    // console.log(this.currentSearch);
    this.analytics.link({
      key_activity: 'new dashboard find a new medication',
      link_name: 'Custom: New Dashboard find a new medication clicked'
    });
    if (environment.production === true) {
      window.parent.location.href = this.configSvc.checkDrugCostFastUrl;
    } else {
      this.router.navigate([FastWidgetTypes.FAST_CDC_V4]);
    }
  }

  clearDrugSearch() {
    console.log('Called to clear Drug Search');
  }

  selectedItem(item) {
    this.drugSelected = item.item;
    // console.log(this.drugCache[this.drugSelected]);
  }

}
