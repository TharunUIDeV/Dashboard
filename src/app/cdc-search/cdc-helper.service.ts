import {Injectable} from '@angular/core';
import {ConfigService} from '../service/config.service';
import * as CDCCurrentSearch from '../../assets/mock-data/mock-cdcsearch-data.json';
import {MemberService} from '../service/member.service';


@Injectable()
export class CdcHelperService {

  private sessionStorage = window.sessionStorage;
  private sessionData = {};

  constructor(private configService: ConfigService) {
  }


  setSessionStorage (key, data) {
    try {
      if (typeof(Storage) !== 'undefined') {
        this.sessionStorage.setItem(key, JSON.stringify(data));
      }
    } catch (e) {
      console.log(e);
    }

  }

  getSessionStorage (key) {
    try {
      if (typeof(Storage) !== 'undefined' && this.sessionStorage[key]) {
        return JSON.parse(this.sessionStorage[key]);
      }
    } catch (e) {
      console.log(e);
      return false;
    }
    return false;
  }


  setSessionData(currentSearch) {
    this.sessionData['currentSearch'] = currentSearch;
    this.setSessionStorage(this.configService.token, this.sessionData);
  }

}
