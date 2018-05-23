import {BrowserModule} from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { RefillComponent } from './refill/refill.component';
import { OrderStatusComponent } from './order-status/order-status.component';

import { AttentionComponent } from './attention/attention.component';
import { OrderStatusFilterPipe } from './order-status/order-status-filter.pipe';
import {HttpClientModule} from '@angular/common/http';

import * as fromServices from './service';
import {NgModule} from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [
    AppComponent,
    RefillComponent,
    OrderStatusComponent,
    AttentionComponent,
    OrderStatusFilterPipe,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],

  providers: [
    [...fromServices.services],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
