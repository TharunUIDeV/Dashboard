import { Injectable } from '@angular/core';
import {CaremarkDataService} from './caremark-data.service';
import {caremarksdk} from '../types/caremarksdk';

@Injectable()
export class MemberService {
  get memberDetails(): caremarksdk.MemberInfoResult {
    return this._memberDetails;
  }

  private _memberDetails: caremarksdk.MemberInfoResult;

  constructor(private caremarkDataService: CaremarkDataService) {
    this.caremarkDataService.getMemberDetails().then((memberData) => {
      this._memberDetails = memberData.Results.memberInfo;
    }).catch( (error) => {
      console.log(error);
    });
  }


}
