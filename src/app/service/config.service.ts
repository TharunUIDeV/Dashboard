import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {isNullOrUndefined} from 'util';
import {Observable} from 'rxjs/Observable';

declare const window: any;

@Injectable()
export class ConfigService {
  public env: string;
  public apiKey: string;
  public apiSecret: string;
  public iceApiKey: string;
  public iceApiSecret: string;
  public token: string;
  public apiBaseUrl: string;
  public iceApiBaseUrl: string;
  public participantFirstName: string;
  public orderStatusUrl: string;
  public refillRxUrl: string;
  public homePageUrl: string;
  public memberId: string;
  public emailAddr: string;
  public userProfile: string;
  public pznId: string;
  public iceMemberToken: string;
  public clientID: string;
  public showLatestVersion: boolean;
  public rxHistoryUrl: string;
  public checkDrugCostFastUrl: string;
  public portalSessionId: string;
  public clientChannelId: string;
  public fastBaseUrl: string;

  ready = new BehaviorSubject(false);

  public initDone(): Observable<boolean> {
    return new Observable((observer) => {
      if (this.ready.getValue() === true) {
        observer.next(true);
        // observer.complete();
      } else {
        observer.next(undefined);
      }
    });
  }

  constructor() {
    if (isNullOrUndefined(this.env)) {
      this.env = 'prod';
    }
    this.init();
  }

  private getBaseServiceUrlByType() {
    if (this.env && this.userProfile === 'PBM') {
      if (_.includes(this.env, 'sit')) {
        this.apiBaseUrl = `https://${this.env}pbmservices.caremark.com/`;
        this.fastBaseUrl = `https://${this.env}fast.caremark.com/`;
        // this.fastBaseUrl = `https://localhost:8089/`;
      } else if (_.includes(this.env, 'dev')) {
        this.apiBaseUrl = `https://devservices-west.caremark.com:11101/`;
        this.fastBaseUrl = `https://${this.env}fast.caremark.com`;
      } else if (_.includes(this.env, 'stp')) {
        this.apiBaseUrl = `https://stpservices.caremark.com:11101/`;
        this.fastBaseUrl = `https://stpfast.caremark.com`;
      } else if (_.includes(this.env, 'prod')) {
        this.apiBaseUrl = `https://pbmservices.caremark.com/`;
        this.fastBaseUrl = `https://fast.caremark.com/`;
      }
    } else if (this.env && this.userProfile === 'ICE') {
      if (_.includes(this.env, 'sit')) {
        this.iceApiBaseUrl = `https://icet-${this.env}.caremark.com/Services/icet/`;
        this.fastBaseUrl = `https://${this.env}fast.caremark.com/`;
      } else if (_.includes(this.env, 'dev')) {
        this.iceApiBaseUrl = `https://icet-${this.env}.caremark.com/Services/icet/`;
        this.fastBaseUrl = `https://${this.env}fast.caremark.com`;
      } else if (_.includes(this.env, 'prod')) {
        this.iceApiBaseUrl = `https://t.caremark.com/Services/icet/`;
        this.fastBaseUrl = `https://fast.caremark.com/`;
      }
    }
  }

  private getIceApiKey() {
    let iceApiKey;
    if (this.env === 'dev3' || this.env === 'sit3') {
      iceApiKey = 'c69e906f-5c23-4be8-be73-d43527cece5b';
    } else if (this.env === 'prod') {
      iceApiKey = '8dcc0289-81ef-42c6-8d1f-a6e56abcd2d2';
    } else {
      console.error(`Not a valid environment: ${JSON.stringify(this.env)}`);
    }
    return iceApiKey;
  }

  private getIceApiSecret() {
    let iceApiSecret;
    if (this.env === 'dev3' || this.env === 'sit3') {
      iceApiSecret = '040fcd53-a4be-4638-8720-e15c26290cbb';
    } else if (this.env === 'prod') {
      iceApiSecret = '6a88b8e0-a504-461b-a03d-f0be5b892884';
    } else {
      console.error(`Not a valid environment: ${JSON.stringify(this.env)}`);
    }
    return iceApiSecret;
  }

  init: Function = () => {
    try {
      const data = <any>window.parent.portalJson;
      if (data) {
        this.env = data.apiData.env;
        this.apiKey = data.apiData.apiKey;
        this.apiSecret = data.apiData.apiSecret;
        this.apiBaseUrl = data.apiData.apiBaseUrl;
        this.token = data.apiData.tokenId;
        this.userProfile = data.apiData.profileType;
        this.iceMemberToken = data.apiData.iceToken;
        if (_.includes(this.apiBaseUrl, 'devservices-west.caremark.com')) {
          this.apiBaseUrl = `https://devservices-west.caremark.com:11101/`;
        }
        this.participantFirstName = data.appData.ParticipantFirstName;
        this.refillRxUrl = data.appData.RefillRXUrl;
        this.homePageUrl = data.appData.HomePageUrl;
        this.memberId = data.appData.ParticipantExternalId;
        this.emailAddr = data.appData.ParticpantUserId;
        this.pznId = data.appData.PersonalizationId;
        this.clientID = data.appData.clientId;
        this.showLatestVersion = data.appData.ShowNewDashboardV2;
        this.portalSessionId = data.appData.sessionID;
        this.clientChannelId = data.appData.clientChannelId;
        this.checkDrugCostFastUrl = '/wps/myportal/CHECK_DRUG_COST_FAST';
        if (this.userProfile === 'ICE') {
          this.iceApiKey = this.getIceApiKey();
          this.iceApiSecret = this.getIceApiSecret();
          this.rxHistoryUrl = '/wps/myportal/ICE_FINANCIAL_SUMMARY';
          this.orderStatusUrl = '/wps/myportal/ICE_RECENT_ORDER';
          this.refillRxUrl = '/wps/myportal/ICE_VIEW_RX';
        } else {
          this.rxHistoryUrl = '/wps/myportal/VIEW_RX_HISTORY';
          this.orderStatusUrl = '/wps/myportal/CHECK_ORDER_STATUS';
          this.refillRxUrl = '/wps/myportal/REFILL_RX';
        }
      }
      this.getBaseServiceUrlByType();
    } catch (e) {
      console.log('config service --> init() :' + e);
    } finally {
      this.ready.next(this.validate());
    }
  }

  private validate(): boolean {
    console.log(`Env => ${this.env}\n
    Participant Name => ${this.participantFirstName}\n
    Order_Status_Url => ${this.orderStatusUrl}\n
    Refill_Rx_Url => ${this.refillRxUrl}\n
    Home_Page_Url => ${this.homePageUrl}\n
    User_Profile_Preference => ${this.userProfile}\n
    PZN_ID => ${this.pznId}`);
    return !(isNullOrUndefined(this.env) || isNullOrUndefined(this.apiKey)
      || isNullOrUndefined(this.apiBaseUrl) || isNullOrUndefined(this.token)) ||
      (!isNullOrUndefined(this.env) && this.env.includes('demo'));
  }

}
