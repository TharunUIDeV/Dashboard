import {Injectable} from '@angular/core';
import {CaremarkDataService} from './caremark-data.service';
import {caremarksdk} from '../types/caremarksdk';
import {PZN_CONSTANTS} from '../order-status/order-status.constants';
import {ConfigService} from './config.service';

@Injectable()
export class MemberService {

  private _underageLimit;
  private _memberDetails: caremarksdk.MemberInfoResult;

  constructor(private caremarkDataService: CaremarkDataService,
              private configService: ConfigService) {
  }

  public getMemberDetails() {
    return new Promise((resolve, reject) => {
      if (!this._memberDetails) {
        this.caremarkDataService.getMemberDetails().then((memberData) => {
          this._memberDetails = memberData.Results.memberInfo;
          resolve(this._memberDetails);
        }).catch((error) => {
          console.log(error);
          return reject(error);
        });
      } else {
        return resolve(this._memberDetails);
      }
    });
  }

  public getUnderAgeLimitPzn() {

    return new Promise((resolve, reject) => {
      if (!this._underageLimit) {
        const params = {
          pznId: this.configService.pznId,
          resourceTag: PZN_CONSTANTS.PZN_UNDER_AGE_TAG,
          deliveryResourceTag: PZN_CONSTANTS.DELIVERY_DATE_RANGE_PZN,
        };
        // Defaults
        let ageLimit = '17';
        let deliveryDateRange = false;

        // console.log(JSON.stringify(params));

        this.caremarkDataService.getPznByIdAndResource(params).then((result) => {
          if (result && result.detail
            && result.detail.personalizationContent
            && result.detail.personalizationContent.personalizationContents
            && result.detail.personalizationContent.personalizationContents.length > 0) {
            result.detail.personalizationContent.personalizationContents.forEach(pznContent => {
              if (pznContent.resourceTagId === PZN_CONSTANTS.PZN_UNDER_AGE_TAG) {
                ageLimit = pznContent.contentText;
              } else if (pznContent.resourceTagId === PZN_CONSTANTS.DELIVERY_DATE_RANGE_PZN && pznContent.resourceVisibleIndicator === 1) {
                deliveryDateRange = true;
              }
            });
          }
        }).catch((error) => {
          console.error('Failed to get PZN data');
        }).then(() => {
          this._underageLimit = ageLimit;
          return resolve(this._underageLimit);
        });
      } else {
        resolve(this._underageLimit);
      }
    });
  }


}
