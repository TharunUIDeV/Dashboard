import {AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ConfigService} from '../service/config.service';
import {CdcHelperService} from './cdc-helper.service';
import {TealiumUtagService} from '../service/utag.service';
import {Observable} from 'rxjs/Observable';
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {of} from 'rxjs/observable/of';
import {NgForm} from '@angular/forms';
import {MemberService} from '../service/member.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FastWidgetTypes} from '../fast-widgets/fast-widgets.component';
import {environment} from '../../environments/environment';
import {VordelPbmService} from '../service/vordel-pbm.service';
import {DrugSearchFetchDefaultPharmacy} from '../store/drug-search/drug-search.actions';

@Component({
  selector: 'app-cdc-search',
  templateUrl: './cdc-search.component.html',
  styleUrls: ['./cdc-search.component.css']
})
export class CdcSearchComponent implements OnInit {
  searching = false;
  searchFailed = false;
  drugSearched = '';
  defaultPharmacy = undefined;
  defaultPharmacyNgStore$;
  loading = true;

  private drugSearch$;
  private drugSelected;
  private drugCache = {};
  private memberInfo = undefined;
  private currentSearch: any = {};
  public setDefaultPharmacy = false;
  constructor(private analytics: TealiumUtagService,
              private configSvc: ConfigService,
              private cdcHelperService: CdcHelperService,
              private vordelService: VordelPbmService,
              private memberService: MemberService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<any>) {
    this.drugSearch$ = this.store.select('drugSearchState');
    this.defaultPharmacyNgStore$ = this.store.select('drugSearchDefaultPharmacy');
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
            drug.sortKey = this.cdcHelperService.getSortKey(drug);
            return drug;
          })),
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
            return of([err]);
          }))
      ),
      tap(() => this.searching = false)
    )

  ngOnInit() {
    this.store.dispatch(new DrugSearchFetchDefaultPharmacy());
    this.defaultPharmacyNgStore$.subscribe((pharmacy) => {
      this.loading = false;
      if (pharmacy && pharmacy.DefaultPharmacy) {
        this.defaultPharmacy = this.cdcHelperService.setPharmacyDetail(pharmacy.DefaultPharmacy);
        this.setDefaultPharmacy = true;
      }
    }, error => {
      this.defaultPharmacy = undefined;
      this.loading = false;
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
    this.drugSearched = null;
  }

  selectedItem(item) {
    this.drugSelected = item.item;
  }

}
