import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ConfigService} from './service/config.service';
import {BrowserService} from './service/browser.service';
import {FrameService} from './service/frame.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ConfigService, BrowserService, FrameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
