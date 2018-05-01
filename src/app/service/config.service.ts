import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {isNullOrUndefined} from 'util';

declare const window: any;

@Injectable()
export class ConfigService {
  public env: string;
  public apiKey: string;
  public token: string;
  public apiBaseUrl: string;
  public participantFirstName: string;
  public orderStatusUrl: string;
  public refillRxUrl: string;
  public homePageUrl: string;

  ready = new BehaviorSubject(false);

  constructor() {
    if (isNullOrUndefined(this.env)) {
      this.env = 'prod';
    }
    if (this.env) {
      if (this.env.includes('sit')) {
        this.apiBaseUrl = `https://${this.env}pbmservices.caremark.com/`;
      } else if (this.env.includes('dev')) {
        this.apiBaseUrl = `https://devservices-west.caremark.com:11101/`;
      } else if (this.env.includes('stp')) {
        this.apiBaseUrl = `https://stpservices.caremark.com:11101/`;
      } else if (this.env.includes('prod')) {
        this.apiBaseUrl = `https://pbmservices.caremark.com/`;
      }
    }
    this.init();
  }

  init: Function = _.debounce(() => {
    try {
      const data = <any>window.parent.portalJson;
      if (data) {
        this.env = data.apiData.env;
        this.apiKey = data.apiData.apiKey;
        this.apiBaseUrl = data.apiData.apiBaseUrl;
        this.token = data.apiData.tokenId;
        if (this.apiBaseUrl.includes('devservices-west.caremark.com')) {
          this.apiBaseUrl = `https://devservices-west.caremark.com:11101/`;
        }
        this.participantFirstName = data.appData.ParticipantFirstName;
        this.orderStatusUrl = data.appData.OrderStatusUrl;
        this.refillRxUrl = data.appData.RefillRXUrl;
        this.homePageUrl = data.appData.HomePageUrl;
      }
    } catch (e) {
      console.log('config service --> init() :' + e);
    } finally {
      this.ready.next(this.validate());
    }
  }, 200);


  private validate(): boolean {
    console.log(`Env => ${this.env}\nParticipant Name => ${this.participantFirstName}\nOrder_Status_Url => ${this.orderStatusUrl}\nRefill_Rx_Url => ${this.refillRxUrl}\nHome_Page_Url => ${this.homePageUrl}`);
    return !(isNullOrUndefined(this.env) || isNullOrUndefined(this.apiKey)
      || isNullOrUndefined(this.apiBaseUrl) || isNullOrUndefined(this.token)) || (!isNullOrUndefined(this.env) && this.env.includes('demo'));
  }

}
