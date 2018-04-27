import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import {ConfigService} from './service/config.service';
import {FrameService} from './service/frame.service';
import {isNullOrUndefined} from "util";
import {TealiumUtagService} from './service/utag.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  screenCenter: any;
  loading = false;
  title: String = 'Hello world!';

  constructor(private configSvc: ConfigService, private frameSvc: FrameService, private renderer: Renderer2, private analytics: TealiumUtagService) {
    frameSvc.renderer = renderer;
    this.screenCenter = this.frameSvc.getScreenCenter();
    frameSvc.showLoader.subscribe((val) => {
      this.loading = val;
    });
  }

  ngOnInit(): void {
    const that = this;
    setTimeout(function () {
      that.configSvc.ready.subscribe((value) => {
        if (value) {
          that.analytics.setConfig({
            account: 'cvs',
            profile: 'fast',
            environment: that.configSvc.env === 'demo' ? 'sit3' : that.configSvc.env
          });
        } else {
          console.error('config is invalid');
        }
      });
    }, 500);
  }

  getTitle() {
    return this.title;
  }
}
