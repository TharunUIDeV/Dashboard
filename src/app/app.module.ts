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
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/app.effects';
import {RecentOrdersEffects} from './store/recent-orders/recent-orders.effects';
import {RefillsCountEffects} from './store/refills-count/refills-count.effects';


@NgModule({
  declarations: [
    AppComponent,
    RefillComponent,
    RecentOrdersComponent,
    AttentionComponent,
    SpinnerComponent,
    DefaultRefillComponent,
    DefaultOrderStatusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects,
      RecentOrdersEffects,
      RefillsCountEffects])
  ],

  providers: [
    [...fromServices.services,
    OrderStatusService],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
