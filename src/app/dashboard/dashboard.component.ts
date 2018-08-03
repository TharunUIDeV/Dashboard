import {Component} from '@angular/core';
import {DashboardWidget} from './dashboard-widget';
import {PlanSummaryComponent} from '../plan-summary/plan-summary.component';
import {RecentOrdersComponent} from '../recent-orders/recent-orders.component';
import {RefillComponent} from '../refill/refill.component';
import {ObservableMedia} from '@angular/flex-layout';
import {Observable} from 'rxjs/Observable';
import {ConfigService} from '../service/config.service';
import 'rxjs/add/operator/startWith';
import * as _ from 'lodash';
import {TealiumUtagService} from '../service/utag.service';
import {BrowserService} from '../service/browser.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public isDesktop: boolean;
  title: String;
  widgets: DashboardWidget[] = [];
  cols: Observable<number>;
  cols_big: Observable<number>;
  cols_sml: Observable<number>;
  constructor(private observableMedia: ObservableMedia,
              private configSvc: ConfigService,
              private analytics: TealiumUtagService,
              private browserService: BrowserService) {
    this.getUserAgent();
  }

  getUserAgent() {
    if (_.includes(this.browserService.deviceType.toLowerCase(), 'mobile')) {
      this.isDesktop = false;
    } else {
      this.isDesktop = true;
    }
  }

  loadWidgets() {

    /* Grid column map */
    const cols_map = new Map([
      ['xs', 1],
      ['sm', 4],
      ['md', 8],
      ['lg', 10],
      ['xl', 18]
    ]);

    const cols_map_big = new Map([
      ['xs', 1],
      ['sm', 4],
      ['md', 4],
      ['lg', 4],
      ['xl', 4]
    ]);

    const cols_map_sml = new Map([
      ['xs', 1],
      ['sm', 2],
      ['md', 2],
      ['lg', 2],
      ['xl', 2]
    ]);
    let start_cols: number;
    let start_cols_big: number;
    let start_cols_sml: number;
    cols_map.forEach((cols, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start_cols = cols;
      }
    });
    cols_map_big.forEach((cols_big, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start_cols_big = cols_big;
      }
    });
    cols_map_sml.forEach((cols_sml, mqAliast) => {
      if (this.observableMedia.isActive(mqAliast)) {
        start_cols_sml = cols_sml;
      }
    });
    this.cols = this.observableMedia.asObservable()
      .map(change => {
        return cols_map.get(change.mqAlias);
      }).startWith(start_cols);
    this.cols_big = this.observableMedia.asObservable()
      .map(change => {
        return cols_map_big.get(change.mqAlias);
      }).startWith(start_cols_big);
    this.cols_sml = this.observableMedia.asObservable()
      .map(change => {
        return cols_map_sml.get(change.mqAlias);
      }).startWith(start_cols_sml);

    this.widgets.push(new DashboardWidget(
      {
        name: {key: DashboardWidget.metadata.NAME, value: 'app-plan-summary'},
        routerLink: {key: DashboardWidget.metadata.ROUTERLINK, value: '/dashboard/planSummaryWidget'},
        cols: {
          key: DashboardWidget.metadata.COLS,
          value: this.cols_big
        },
        rows: {
          key: DashboardWidget.metadata.ROWS,
          value: this.cols_big
        },
      }, PlanSummaryComponent));

    this.widgets.push(new DashboardWidget(
      {
        name: {key: DashboardWidget.metadata.NAME, value: 'app-recent-orders'},
        routerLink: {key: DashboardWidget.metadata.ROUTERLINK, value: '/dashboard/recentOrdersWidget'},
        cols: {
          key: DashboardWidget.metadata.COLS,
          value: this.cols_big
        },
        rows: {
          key: DashboardWidget.metadata.ROWS,
          value: this.cols_big
        },
      }, RecentOrdersComponent));

    this.widgets.push(new DashboardWidget(
      {
        name: {key: DashboardWidget.metadata.NAME, value: 'app-refill'},
        routerLink: {key: DashboardWidget.metadata.ROUTERLINK, value: '/dashboard/refillsWidget'},
        cols: {
          key: DashboardWidget.metadata.COLS,
          value: this.cols_big
        },
        rows: {
          key: DashboardWidget.metadata.ROWS,
          value: this.cols_big
        },
      }, RefillComponent));

    this.widgets.push(new DashboardWidget(
      {
        name: {key: DashboardWidget.metadata.NAME, value: 'app-attention'},
        routerLink: {key: DashboardWidget.metadata.ROUTERLINK, value: '/dashboard/attentionWidget'},
        cols: {
          key: DashboardWidget.metadata.COLS,
          value: this.cols_big
        },
        rows: {
          key: DashboardWidget.metadata.ROWS,
          value: this.cols_big
        },
      }, RefillComponent));
  }

  getTitle() {
    this.title = 'Hello '.concat(_.upperFirst(_.toLower(this.configSvc.participantFirstName)));
    return this.title;
  }

  gotoDashboard() {
    this.analytics.link({
      key_activity: 'new dashboard view my current dashboard',
      link_name: 'Custom: New Dashboard view my current dashboard clicked'
    });
    window.parent.location.href = this.configSvc.homePageUrl;
  }
}
