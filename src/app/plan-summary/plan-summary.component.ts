import {Component, OnInit} from '@angular/core';
import {PlanSummaryService} from '../service/plan-summary.service';
import {isArray} from 'util';
import * as _ from 'lodash';

export enum PLAN_TYPE {
  DEDUCTIBLE = 'Deductible',
  MEDICATIONS = 'Medications',
  ALL_DRUGS = 'All Drugs'
}

@Component({
  selector: 'app-plan-summary',
  templateUrl: './plan-summary.component.html',
  styleUrls: ['./plan-summary.component.css']
})
export class PlanSummaryComponent implements OnInit {

  private planSummaryData;
  public appliedAmount;
  private deductibleType;
  public planAmount: string;
  public remainingAmount: string;
  public deductibleTitle;
  public loading = true;

  constructor(private planSummaryService: PlanSummaryService) { }

  ngOnInit() {
    this.planSummaryService.getPlanSummaryData().then(data => {
      this.planSummaryData = data;
      // Show Graph only for Non-Medicare Users
      if (this.planSummaryData && !this.isMedicareUser()) {
        this.getDeductibleMemberType();
        if (this.deductibleType) {
          this.constructHeader(this.deductibleType);
          this.planAmount = parseFloat(this.deductibleType.planAmount).toFixed(2);
          this.appliedAmount = parseInt(this.deductibleType.appliedAmountNumeric, 10);
          this.calculateRemainingAmount(this.deductibleType);
        }
      } else {
        // Ignore for now. Until we land on solution for medicare members.
      }
      this.loading = false;
    });
  }

  isMedicareUser() {
    if (this.planSummaryData && this.planSummaryData.planSummary) {
      if (this.planSummaryData.planSummary.length > 0) {
        return this.planSummaryData.planSummary[0].medicare;
      } else {
        // if there is no data for plan summary, then set Medicare=true and ignore to show the graph
        return true;
      }
    }
    return undefined;
  }

  constructHeader(deductible) {
    let header = '';
    if (deductible && deductible.planType && deductible.planTypeRxDesc) {
      header = deductible.planTypeRxDesc + ' ' + PLAN_TYPE.DEDUCTIBLE;
    } else if (deductible && deductible.planType) {
      header = this.titleCase(deductible.planType) + ' ' + PLAN_TYPE.DEDUCTIBLE;
    }

    if (deductible.drugListProfileDescription && deductible.drugListProfileDescription.trim() !== PLAN_TYPE.ALL_DRUGS) {
      header = header + ' for ' + this.titleCase(deductible.drugListProfileDescription) + ' ' + PLAN_TYPE.MEDICATIONS;
    }
    this.deductibleTitle = header;
  }

  coverageClick() { }

  copayClick() { }

  calculateRemainingAmount(deductible) {
    if (deductible && deductible.remainingAmount) {
      const remainingAmountNumeric = deductible.remainingAmount.substr(1, deductible.remainingAmount.length);
      const remainAmount = remainingAmountNumeric.replace(',', '');
      this.remainingAmount = parseFloat(remainAmount).toFixed(2);
    } else {
      this.remainingAmount = (parseInt(deductible.planAmount, 10) - parseInt(deductible.appliedAmountNumeric, 10)).toFixed(2);
    }

    // Extracted this from current plan summary.
    if (parseFloat(this.remainingAmount) < 0) {
      this.remainingAmount = '0';
    }
  }

  getDeductibleMemberType() {
    let planSummary;
    if (this.planSummaryData && this.planSummaryData.planSummary) {
      if (isArray(this.planSummaryData.planSummary)) {
        planSummary = this.planSummaryData.planSummary[0];
      }
    }
    if (planSummary && planSummary.deductible) {
      planSummary.deductible.forEach((dedType) => {
        // Per PO, Consider only Individual, if the response has both individual and family.
        if (dedType.individual && dedType.family) {
          this.deductibleType = dedType.individual;
        } else if (dedType.individual) {
          this.deductibleType = dedType.individual;
        } else if (dedType.family) {
          this.deductibleType = dedType.family;
        } else {
          this.deductibleType = undefined;
        }
      });
    }
  }

  /*  planSummary() {
      if (environment.production === true) {
        window.parent.location.href = this.configSvc.planSummaryFastUrl;
      } else {
        this.router.navigate([FastWidgetTypes.FAST_PLAN_SUMMARY]);
      }
    }*/

  // Helper Methods

  titleCase(title: string) {
    return _.startCase(_.toLowerCase(title));
  }
}

