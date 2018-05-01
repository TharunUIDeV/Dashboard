import {Component, OnInit} from '@angular/core';
import {ConfigService} from './service/config.service';
import {TealiumUtagService} from './service/utag.service';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: String;
  loading = false;
  public environment: string;

  constructor(private configSvc: ConfigService, private analytics: TealiumUtagService) {
    this.environment = this.configSvc.env === 'demo' ? 'sit3' : this.configSvc.env;
  }

  ngOnInit(): void {
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
      Page_Name: 'new dashboard view orders',
      Page_Category: 'caremark dashboard'
    });
  }

  gotoDashboard() {
    this.analytics.link({
      key_activity: 'new dashboard view my current dashboard',
      link_name: 'Custom: New Dashboard view my current dashboard clicked'
    });
    window.parent.location.href=this.configSvc.homePageUrl;
  }

  getTitle() {
    this.title = 'Hello '.concat(this.configSvc.participantFirstName);
    return this.title;
  }
}
