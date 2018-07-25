import {Component, Injector, OnInit} from '@angular/core';
import {FastWidgetTypes} from '../fast-widgets/fast-widgets.component';
import {environment} from '../../environments/environment';
import {ConfigService} from '../service/config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractDashboardWidget} from '../dashboard/abstract-dashboard-widget';
import {DashboardWidget} from '../dashboard/dashboard-widget';

@Component({
  selector: 'app-plan-summary',
  templateUrl: './plan-summary.component.html',
  styleUrls: ['./plan-summary.component.css']
})
export class PlanSummaryComponent  implements OnInit {

  constructor(private configSvc: ConfigService,
              private route: ActivatedRoute,
              private router: Router,
              private injector: Injector) {
   /* super(injector.get(DashboardWidget.metadata.NAME),
      injector.get(DashboardWidget.metadata.ROUTERLINK),
      injector.get(DashboardWidget.metadata.COLS),
      injector.get(DashboardWidget.metadata.ROWS));*/
  }

  ngOnInit() {
  }

  planSummary() {
    if (environment.production === true) {
      window.parent.location.href = this.configSvc.planSummaryFastUrl;
    } else {
      this.router.navigate([FastWidgetTypes.FAST_PLAN_SUMMARY]);
    }
  }

}
