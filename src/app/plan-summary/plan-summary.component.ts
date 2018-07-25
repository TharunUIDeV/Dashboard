import {Component, Injector, OnInit} from '@angular/core';
import {FastWidgetTypes} from '../fast-widgets/fast-widgets.component';
import {environment} from '../../environments/environment';
import {ConfigService} from '../service/config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PlanSummaryService} from '../service/plan-summary.service';

@Component({
  selector: 'app-plan-summary',
  templateUrl: './plan-summary.component.html',
  styleUrls: ['./plan-summary.component.css']
})
export class PlanSummaryComponent implements OnInit {

  private planSummaryData;

  constructor(private configSvc: ConfigService,
              private route: ActivatedRoute,
              private router: Router,
              private injector: Injector,
              private planSummaryService: PlanSummaryService) {
  }

  ngOnInit() {
    this.planSummaryData = this.planSummaryService.getPlanSummaryData();
  }

  planSummary() {
    if (environment.production === true) {
      window.parent.location.href = this.configSvc.planSummaryFastUrl;
    } else {
      this.router.navigate([FastWidgetTypes.FAST_PLAN_SUMMARY]);
    }
  }
}

