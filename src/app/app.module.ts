import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RefillComponent} from './refill/refill.component';
import {RecentOrdersComponent} from './recent-orders/recent-orders.component';
import {AttentionComponent} from './attention/attention.component';
import {HttpClientModule} from '@angular/common/http';
import * as fromServices from './service';
import {NgModule} from '@angular/core';
import {SpinnerComponent} from './spinner/spinner.component';
import {OrderStatusService} from './order-status/order-status.service';
import {DefaultRefillComponent} from './default-refill/default-refill.component';
import {DefaultOrderStatusComponent} from './default-order-status/default-order-status.component';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './store/app.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './store/app.effects';
import {RecentOrdersEffects} from './store/recent-orders/recent-orders.effects';
import {RefillsCountEffects} from './store/refills-count/refills-count.effects';
import {CdcHelperService} from './cdc-search/cdc-helper.service';
import {AppRoutingModule} from './app-routing.module';
import {FastWidgetsComponent} from './fast-widgets/fast-widgets.component';
import {HeaderComponent} from './header/header.component';
import {CdcSearchComponent} from './cdc-search/cdc-search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbTypeaheadModule} from './typeahead/typeahead.module';
import {DrugSearchEffects} from './store/drug-search/drug-search.effects';
import {PlanSummaryComponent} from './plan-summary/plan-summary.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashboardWidgetLoaderComponent} from './dashboard/dashboard-widget-loader.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import {PlanSummaryNumberPipe} from './plan-summary/plan-summary-number-pipe';

@NgModule({
  declarations: [
    AppComponent,
    RefillComponent,
    RecentOrdersComponent,
    AttentionComponent,
    SpinnerComponent,
    DefaultRefillComponent,
    DefaultOrderStatusComponent,
    FastWidgetsComponent,
    HeaderComponent,
    CdcSearchComponent,
    PlanSummaryComponent,
    DashboardComponent,
    DashboardWidgetLoaderComponent,
    PlanSummaryNumberPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects,
      RecentOrdersEffects,
      RefillsCountEffects,
      DrugSearchEffects]),
    AppRoutingModule,
    NgbTypeaheadModule.forRoot(),
    FlexLayoutModule,
    RoundProgressModule
  ],

  providers: [
    [...fromServices.services,
      OrderStatusService, CdcHelperService, NgbTypeaheadModule.forRoot().providers],
  ],
  bootstrap: [AppComponent,
    /*PlanSummaryComponent,
    RecentOrdersComponent,
    RefillComponent*/]
})
export class AppModule {
}
