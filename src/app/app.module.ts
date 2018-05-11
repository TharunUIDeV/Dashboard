import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {ConfigService} from './service/config.service';
import {BrowserService} from './service/browser.service';
import {FrameService} from './service/frame.service';


import { AppComponent } from './app.component';
import { RefillComponent } from './refill/refill.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import {TealiumUtagService} from './service/utag.service';
import {CaremarkDataService} from './service/caremark-data.service';

import { AttentionComponent } from './attention/attention.component';
import {CaremarkSdkService} from './service/caremark-sdk.service';
import {IceSdkService} from './service/ice-sdk.service';

export function configServiceFactory(configSvc: ConfigService) {
  return () => configSvc.init;
}

@NgModule({
  declarations: [
    AppComponent,
    RefillComponent,
    OrderStatusComponent,
    AttentionComponent
  ],
  imports: [
    BrowserModule
  ],

  providers: [ConfigService,
    {provide: APP_INITIALIZER, useFactory: configServiceFactory, deps: [ConfigService], multi: true},
    BrowserService, FrameService, TealiumUtagService,
    CaremarkDataService,
    CaremarkSdkService,
    IceSdkService,
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
