import { Injectable } from '@angular/core';
import {CaremarkDataService} from './caremark-data.service';
import {caremarksdk} from '../types/caremarksdk';
import {PZN_CONSTANTS} from '../order-status/order-status.constants';
import {ConfigService} from './config.service';

@Injectable()
export class MemberService {
  get underageLimit() {
    return this._underageLimit;
  }
  private _underageLimit;

  get memberDetails(): caremarksdk.MemberInfoResult {
    return this._memberDetails;
  }

  private _memberDetails: caremarksdk.MemberInfoResult;

  constructor(private caremarkDataService: CaremarkDataService,
              private configService: ConfigService) {
    this.caremarkDataService.getMemberDetails().then((memberData) => {
      this._memberDetails = memberData.Results.memberInfo;
    }).catch( (error) => {
      console.log(error);
    });

    this.getUnderAgeLimitPzn().then( (pznData: any) => {
      this._underageLimit = pznData.ageLimit;
    });
  }

  private getUnderAgeLimitPzn (   ) {

    return new Promise((resolve, reject) => {
      const pznId = 'ADD from ConfigService';
      const resourceTag = PZN_CONSTANTS.PZN_UNDER_AGE_TAG;
      const deliveryResourceTag = PZN_CONSTANTS.DELIVERY_DATE_RANGE_PZN;
      // Defaults
      let ageLimit = '17';
      let deliveryDateRange = false;

      this.caremarkDataService.getPznByIdandResource(pznId, resourceTag, deliveryResourceTag).then((result) => {
        if (result && result.detail
          && result.detail.personalizationContent
          && result.detail.personalizationContent.personalizationContents
          && result.detail.personalizationContent.personalizationContents.length > 0) {
          result.detail.personalizationContent.personalizationContents.forEach(pznContent => {
            if (pznContent.resourceTagId === PZN_CONSTANTS.PZN_UNDER_AGE_TAG) {
              ageLimit = pznContent.contentText.__cdata;
            } else if (pznContent.resourceTagId === deliveryResourceTag && pznContent.resourceVisibleIndicator === 1) {
              deliveryDateRange = true;
            }
          });
        }
      }).catch((error) => {
        console.error('Failed to get PZN data');
      }).then( () => {
        resolve({ageLimit: ageLimit, deliveryDateRange: deliveryDateRange});
      });
    });
  }


}
