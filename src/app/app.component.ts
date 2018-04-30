import {Component, OnInit} from '@angular/core';
import {ConfigService} from './service/config.service';
import {TealiumUtagService} from './service/utag.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: String = 'Hello world!';

  constructor(private configSvc: ConfigService, private analytics: TealiumUtagService) {}

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
