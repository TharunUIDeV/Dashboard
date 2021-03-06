import {Injectable} from '@angular/core';
import {CaremarkDataService} from './caremark-data.service';
import {caremarksdk} from '../types/caremarksdk';
import {ConfigService} from './config.service';
import {PZN_CONSTANTS} from '../order-status/personalization.constants';
import {VordelPbmService} from './vordel-pbm.service';

@Injectable()
export class MemberService {

  private _underageLimit;
  private _memberDetails: caremarksdk.MemberInfoResult;
  private _memberDetailsLegacy;

  constructor(private caremarkDataService: CaremarkDataService,
              private vordelPbmService: VordelPbmService,
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

  public getMemberDetailsLegacy() {
    return new Promise((resolve, reject) => {
      if (!this._memberDetailsLegacy) {
        this.vordelPbmService.getMemberDetails().subscribe((memberData) => {
          this._memberDetailsLegacy = memberData;
          resolve(this._memberDetailsLegacy);
        }, (error) => {
          console.log(error);
          return reject(error);
        });
      } else {
        return resolve(this._memberDetailsLegacy);
      }
    });
  }

  public getUnderAgeLimitPzn() {

    return new Promise((resolve, reject) => {
      if (!this._underageLimit) {
        const params = {
          pznId: this.configService.pznId,
          resourceTags : [PZN_CONSTANTS.PZN_UNDER_AGE_TAG, ]
        };
        // Defaults
        let ageLimit = '17';

        // console.log(JSON.stringify(params));

        this.caremarkDataService.getPznByIdAndResource(params).then((result) => {
          if (result && Array.isArray(result)) {
            result.forEach(pznContent => {
              if (pznContent.resourceTagId === PZN_CONSTANTS.PZN_UNDER_AGE_TAG) {
                ageLimit = pznContent.contentText;
              }
            });
          } else if (result && result.contentText) {
            ageLimit = result.contentText;
          } else {
            console.error('Wrong response');
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
