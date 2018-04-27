import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ConfigService} from './service/config.service';
import {BrowserService} from './service/browser.service';
import {FrameService} from './service/frame.service';

import { AppComponent } from './app.component';
import { RefillComponent } from './refill/refill.component';
import { OrderStatusComponent } from './order-status/order-status.component';


@NgModule({
  declarations: [
    AppComponent,
    RefillComponent,
    OrderStatusComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ConfigService, BrowserService, FrameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
