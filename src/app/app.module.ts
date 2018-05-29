import {BrowserModule} from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { RefillComponent } from './refill/refill.component';
import { RecentOrdersComponent } from './recent-orders/recent-orders.component';

import { AttentionComponent } from './attention/attention.component';
import { OrderStatusFilterPipe } from './order-status/order-status-filter.pipe';
import {HttpClientModule} from '@angular/common/http';

import * as fromServices from './service';
import {NgModule} from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';
import {OrderStatusService} from './order-status/order-status.service';



@NgModule({
  declarations: [
    AppComponent,
    RefillComponent,
    RecentOrdersComponent,
    AttentionComponent,
    OrderStatusFilterPipe,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],

  providers: [
    [...fromServices.services,
    OrderStatusService],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
