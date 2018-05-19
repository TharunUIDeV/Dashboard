import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';


import { AppComponent } from './app.component';
import { RefillComponent } from './refill/refill.component';
import { OrderStatusComponent } from './order-status/order-status.component';

import { AttentionComponent } from './attention/attention.component';
import { OrderStatusFilterPipe } from './order-status/order-status-filter.pipe';
import {HttpClientModule} from '@angular/common/http';


import * as  fromServices from './service';


export function configServiceFactory(configSvc: fromServices.ConfigService) {
  return () => configSvc.init;
}

@NgModule({
  declarations: [
    AppComponent,
    RefillComponent,
    OrderStatusComponent,
    AttentionComponent,
    OrderStatusFilterPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],

  providers: [
    [...fromServices.services],
    {provide: APP_INITIALIZER, useFactory: configServiceFactory, deps: [fromServices.ConfigService], multi: true},
    { provide: 'CAREMARKSDK_INSTANCE', useFactory: getCareMarkSdk},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getCareMarkSdk() {

  if (typeof window !== 'undefined' && typeof window['SDK'] !== 'undefined') {
    window['SDK'].setIdentity('browser');
    return window['SDK'];
  }
  return null;
}
