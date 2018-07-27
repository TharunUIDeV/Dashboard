import {Component, OnInit} from '@angular/core';
import {ConfigService} from './service/config.service';
import {TealiumUtagService} from './service/utag.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading = false;
  public environment: string;
  public showLatestVersion = true;

  constructor(private configSvc: ConfigService, private analytics: TealiumUtagService) { }

  ngOnInit(): void {
    this.getUserProfilePreference();
    this.environment = this.configSvc.env === 'demo' ? 'sit3' : this.configSvc.env;
    const that = this;
      if (!isNullOrUndefined(this.environment)) {
        setTimeout(that.analytics.setConfig({
          account: 'cvs',
          profile: 'fast',
          environment: that.configSvc.env === 'demo' ? 'sit3' : that.configSvc.env
        }), 200);
      } else {
        console.error('config is invalid');
      }

    this.analytics.view({
      Page_Name: 'new dashboard',
      Page_Category: 'caremark dashboard'
    });
  }

  getUserProfilePreference() {
    if (this.configSvc.showLatestVersion === false  || this.configSvc.userProfile === 'ICE') {
      this.showLatestVersion = false;
    }
  }
}
