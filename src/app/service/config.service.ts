import {Injectable, APP_INITIALIZER} from '@angular/core';
import * as _ from 'lodash';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {isNullOrUndefined} from 'util';

declare const window: any;

@Injectable()
export class ConfigService {
  public env: string;
  public apiKey: string;
  public apiSecret: string;
  public token: string;
  public apiBaseUrl: string;
  public participantFirstName: string;
  public orderStatusUrl: string;
  public refillRxUrl: string;
  public homePageUrl: string;
  public memberId: string;
  public emailAddr: string;
  public userProfile: string;
  public pznId: string;
  public iceMemberToken: string;
  public clientID; string;

  ready = new BehaviorSubject(false);

  constructor() {
    if (isNullOrUndefined(this.env)) {
      this.env = 'prod';
    }
    if (this.env) {
      if (_.includes (this.env, 'sit')) {
        this.apiBaseUrl = `https://${this.env}pbmservices.caremark.com/`;
      } else if (_.includes (this.env, 'dev')) {
        this.apiBaseUrl = `https://devservices-west.caremark.com:11101/`;
      } else if (_.includes (this.env, 'stp')) {
        this.apiBaseUrl = `https://stpservices.caremark.com:11101/`;
      } else if (_.includes (this.env, 'prod')) {
        this.apiBaseUrl = `https://pbmservices.caremark.com/`;
      }
    }
    this.init();
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
        this.orderStatusUrl = data.appData.OrderStatusUrl;
        this.refillRxUrl = data.appData.RefillRXUrl;
        this.homePageUrl = data.appData.HomePageUrl;
        this.memberId = data.appData.ParticipantExternalId;
        this.emailAddr = data.appData.ParticpantUserId;
        this.pznId = data.appData.PersonalizationId;
        this.clientID = data.appData.clientId;
      }
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
      || isNullOrUndefined(this.apiBaseUrl) || isNullOrUndefined(this.token)) || (!isNullOrUndefined(this.env) && this.env.includes('demo'));
  }

}
