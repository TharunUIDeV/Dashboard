import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ConfigService} from '../service/config.service';
import {CdcHelperService} from './cdc-helper.service';
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
import * as _ from 'lodash';
import {VordelPbmService} from '../service/vordel-pbm.service';

@Component({
  selector: 'app-cdc-search',
  templateUrl: './cdc-search.component.html',
  styleUrls: ['./cdc-search.component.css']
})
export class CdcSearchComponent implements OnInit, AfterViewInit {

  searching = false;
  searchFailed = false;
  drugSearched = '';
  defaultPharmacy = undefined;

  private drugSearch$;
  private drugSelected;
  private drugCache = {};
  private memberInfo = undefined;
  private currentSearch: any = {};
  constructor(private analytics: TealiumUtagService,
              private configSvc: ConfigService,
              private cdcHelperService: CdcHelperService,
              private vordelService: VordelPbmService,
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
      // filter((term) => term.length > 2),
      tap((term) => {
        this.searching = true;
        this.drugSearched = term;
      }),
      switchMap((term) => this.cdcHelperService.drugSearch(term).pipe(
          tap( (drugs) => {
            this.searchFailed = false;
            this.cdcHelperService.cachedrugSearchResults(term, drugs);
          }),
          map( (drugs) =>  drugs.map(drug => {
            let drugKey = this.cdcHelperService.getDrugName(drug);
            drugKey = this.cdcHelperService.transformTitleCase(drugKey);
            this.drugCache[drugKey] = drug;
            drug.drugKey = drugKey;
            drug.sortKey = this.cdcHelperService.getDrugName(drug).toLowerCase();
            return drug;
          })),
          // map((drugs) => _.sortBy(drugs, 'drugKey' ) ),
          map((drugs) => {
            this.cdcHelperService.sortList(drugs, 'sortKey' );
            return drugs;
          } ),
          map((drugs) => drugs.map(drug => drug.drugKey)),
          map((drugNames) => drugNames.filter( (drugName) => {
            return (  drugName.toLowerCase().indexOf(term.toLowerCase()) === 0);
          }) ),
          catchError((err) => {
            this.searchFailed = true;
            console.log(err.message);
            return of([err.message]);
          }))
      ),
      tap(() => this.searching = false)
    )

  ngAfterViewInit() {
    if (true) {
      this.drugSearched = null;
    }
  }

  ngOnInit() {
    this.cdcHelperService.getDefaultPharmacy().subscribe((pharmacy) => {
      // console.log(JSON.stringify(pharmacy));
      this.defaultPharmacy = this.cdcHelperService.setPharmacyDetail(pharmacy);
    }, error => {
      console.log(JSON.stringify(error));
      this.defaultPharmacy = undefined;
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
    this.currentSearch.pharmacy = this.defaultPharmacy;
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
    this.search(of('clear'));
  }

  selectedItem(item) {
    this.drugSelected = item.item;
    // console.log(this.drugCache[this.drugSelected]);
  }

}
