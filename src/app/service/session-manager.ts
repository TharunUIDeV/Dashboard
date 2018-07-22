import {VordelPbmService} from './vordel-pbm.service';
import {ConfigService} from './config.service';
import {Injectable} from '@angular/core';
import {of} from 'rxjs/observable/of';

@Injectable()
export class SessionManager {

  private sessionStorage = window.sessionStorage;
  constructor(private configService: ConfigService) {
  }


  setSessionStorage(key, data) {
    try {
      if (typeof(Storage) !== 'undefined') {
        this.sessionStorage.setItem(key, JSON.stringify(data));
      }
    } catch (e) {
      console.log(e);
    }

  }

  getSessionStorage(key) {
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

  setMemberInfo(data) {
    let sessionStoredData = this.getSessionStorage(this.configService.token);
    if (!sessionStoredData) {
      sessionStoredData = {};
    }
    sessionStoredData.memberInfo = data;
    this.setSessionStorage(this.configService.token, sessionStoredData);
  }

  getMemberInfo() {
    const sessionStoredData = this.getSessionStorage(this.configService.token);
    if (sessionStoredData) {
      return sessionStoredData['memberInfo'];
    }
  }

  setDrugSearchResults(data) {
    let sessionStoredData = this.getSessionStorage(this.configService.token);
    if (!sessionStoredData) {
      sessionStoredData = {};
    }
    sessionStoredData.drugSearchResultCache = data;
    this.setSessionStorage(this.configService.token, sessionStoredData);
  }


  setCDCCurrentSearch(currentSearch) {
    let sessionStoredData = this.getSessionStorage(this.configService.token);
    if (!sessionStoredData) {
      sessionStoredData = {};
    }
    sessionStoredData.currentSearch = currentSearch;
    this.setSessionStorage(this.configService.token, sessionStoredData);
  }

  setCDCMemberDetails(memberDetails, memberList) {
    let sessionStoredData = this.getSessionStorage(this.configService.token);
    if (!sessionStoredData) {
      sessionStoredData = {};
    }
    sessionStoredData.loggedInUserInfo = memberDetails;
    sessionStoredData.memberList = memberList;
    this.setSessionStorage(this.configService.token, sessionStoredData);
  }
}
