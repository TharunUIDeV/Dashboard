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
import {fromPromise} from 'rxjs/observable/fromPromise';
import {NgForm} from '@angular/forms';
import {MemberService} from '../service/member.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {FastWidgetTypes} from '../fast-widgets/fast-widgets.component';

@Component({
  selector: 'app-cdc-search',
  templateUrl: './cdc-search.component.html',
  styleUrls: ['./cdc-search.component.css']
})
export class CdcSearchComponent implements OnInit {

  searching = false;
  searchFailed = false;
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
      tap(() => this.searching = true),
      /*
      filter( () => {
        if (this.defaultPharmacy && this.memberInfo) {
          return true;
        } else {
          return false;
        }
      }),*/
      switchMap(term =>
        fromPromise(this.caremarkDataService.getDrugByName(term)).pipe(
          tap( () => this.searchFailed = false),
          map( (drugs) =>  drugs.map(drug => {
            const drugKey = this.cdcHelperService.getDrugName(drug);
            // console.log(drugKey);
            this.drugCache[drugKey] = drug;
            return drugKey;
          })),
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
    // this.router.navigate([FastWidgetTypes.FAST_CDC_V4]);
    this.analytics.link({
      key_activity: 'new dashboard find a new medication',
      link_name: 'Custom: New Dashboard find a new medication clicked'
    });
    window.parent.location.href = this.configSvc.checkDrugCostFastUrl;

  }

  selectedItem(item) {
    this.drugSelected = item.item;
    // console.log(this.drugCache[this.drugSelected]);
  }

}
