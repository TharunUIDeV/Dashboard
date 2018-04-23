import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import {ConfigService} from './service/config.service';
import {FrameService} from './service/frame.service';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  screenCenter: any;
  loading = false;
  title: String = 'Hello world!';

  constructor(private configSvc: ConfigService, private frameSvc: FrameService, private renderer: Renderer2,) {
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
          console.log('Post config service');
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
