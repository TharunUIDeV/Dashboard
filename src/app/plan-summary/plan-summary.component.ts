import {Component, Injector, OnInit} from '@angular/core';
import {FastWidgetTypes} from '../fast-widgets/fast-widgets.component';
import {environment} from '../../environments/environment';
import {ConfigService} from '../service/config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PlanSummaryService} from '../service/plan-summary.service';
import {isArray} from 'util';

@Component({
  selector: 'app-plan-summary',
  templateUrl: './plan-summary.component.html',
  styleUrls: ['./plan-summary.component.css']
})
export class PlanSummaryComponent implements OnInit {

  private planSummaryData;
  public appliedAmount;
  public planAmount: number;
  public remainingAmount: string;
  public deductibleTitle = 'Individual Deductible';

  public loading = true;

  constructor(private configSvc: ConfigService,
              private route: ActivatedRoute,
              private router: Router,
              private injector: Injector,
              private planSummaryService: PlanSummaryService) {
  }

  ngOnInit() {
    this.planSummaryService.getPlanSummaryData().then(data => {
      this.planSummaryData = data;
      console.log(this.planSummaryData);
      if (this.planSummaryData && this.isMedicareUser() === false) {
        // Show Graph
        const deductible = this.getDeductibleMemberType();
        if (deductible) {
          this.constructHeader(deductible);
          this.planAmount = parseInt(deductible.planAmount, 10);
          // this.appliedAmount = deductible.appliedAmount;
          this.appliedAmount = parseInt(deductible.appliedAmountNumeric, 10);
          this.calculateRemainingAmount(deductible);
        }
      } else {
        // Ignore for now. Until we land on solution for medicare members.
      }
      this.loading = false;
    });
  }

  isMedicareUser() {
    if (this.planSummaryData && this.planSummaryData.planSummary) {
      if (isArray(this.planSummaryData.planSummary)) {
        return this.planSummaryData.planSummary[0].medicare;
      } else {
        return this.planSummaryData.planSummary.medicare;
      }
    }
    return undefined;
  }

  constructHeader(deductible) {
      let header = '';

      if (deductible && deductible.planType && deductible.planTypeRxDesc) {
        header = deductible.planTypeRxDesc + ' ' + 'Deductible';
      } else if (deductible  && deductible.planType) {
        header = deductible.planType +  ' ' + 'Deductible';
      }

      if (deductible.drugListProfileDescription !== 'All Drugs') {
        header = header + deductible.drugListProfileDescription + ' for ' + 'Medications';
      }

      this.deductibleTitle = header;

  }

  coverageClick() {  }
  copayClick() {  }

  calculateRemainingAmount(deductible) {
    if (deductible && deductible.remainingAmount) {
      this.remainingAmount = deductible.remainingAmount;
    } else {
      this.remainingAmount = (deductible.planAmount - deductible.appliedAmountNumeric).toString();
    }

    /*// Extracted this from current plan summary.
    if (this.remainingAmount < 0) {
      this.remainingAmount = 0;
    }*/
  }

  getDeductibleMemberType() {
    let planSummary;
    if ( this.planSummaryData && this.planSummaryData.planSummary) {
       if (isArray(this.planSummaryData.planSummary)) {
         planSummary = this.planSummaryData.planSummary[0];
       } else {
         planSummary = this.planSummaryData.planSummary[0];
       }
    }
    if (planSummary && planSummary.deductible) {
      for ( const dedType of planSummary.deductible ) {
        if (dedType.individual) {
          return dedType.individual;
        }
      }
      for ( const dedType of planSummary.deductible ) {
        if (dedType.family) {
          return dedType.family;
        }
      }
    }
    return undefined;
  }

  planSummary() {
    if (environment.production === true) {
      window.parent.location.href = this.configSvc.planSummaryFastUrl;
    } else {
      this.router.navigate([FastWidgetTypes.FAST_PLAN_SUMMARY]);
    }
  }

   /* getPersonlizationContent(pznId) {
      var deferred = $q.defer();
      if (!personlizationMapped) {
        if (parseInt(pznId) <= 0) {
          deferred.resolve();
        }

        var personalizationData = {
          personalizationServiceRequest: {
            tag: config.resourceTag
          }
        };

        var userInfo = userSessionData.getLoggedInUserInfo();

        // if (userInfo && userInfo.personalizationId && userInfo.personalizationId !== '0')
        if (true) {
          personalizationData.personalizationServiceRequest.pznID = pznId;
          cdhServices.getPZNByIDandResourcetag({}, personalizationData).then(function (data) {
            if (help.validateObject(data, 'data.response.header.statusCode') && data.response.header.statusCode === '0000' &&
              help.validateObject(data, 'data.response.detail.detail.personalizationContent.personalizationContents')) {
              var personalizationContents = data.response.detail.detail.personalizationContent.personalizationContents;
              personlizationMapped = {};
              personalizationContents = help.convertToArray(personalizationContents);
              angular.forEach(personalizationContents, function (content) {
                personlizationMapped[content.resourceTagId] = {};
                if (content.contentText) {
                  if (content.contentText.__cdata) {
                    personlizationMapped[content.resourceTagId].contentText = content.contentText.__cdata;
                  } else if (content.contentText.indexOf('CDATA') !== -1) {
                    var contentText = serviceFactory.responseTransform('<formatText>' + content.contentText + '</formatText>');
                    personlizationMapped[content.resourceTagId].contentText = contentText.formatText.__cdata;
                  } else {
                    personlizationMapped[content.resourceTagId].contentText = content.contentText;
                  }
                }

                if (content.resourceVisibleIndicator) {
                  personlizationMapped[content.resourceTagId].resourceVisibleIndicator = content.resourceVisibleIndicator;
                }
              });
            }

            deferred.resolve(personlizationMapped);
          }, function () {

            deferred.resolve(personlizationMapped);
          });
        } else {
          deferred.resolve();
        }
      } else {
        deferred.resolve(personlizationMapped);
      }

      return deferred.promise;
    }*/

}

