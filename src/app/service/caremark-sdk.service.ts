import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {CaremarkDataServiceInterface} from './caremark-data.service.interface';
import {VordelPbmService} from './vordel-pbm.service';

@Injectable()
export class CaremarkSdkService implements CaremarkDataServiceInterface {

  private sdkInstance: any;

  private static getCareMarkWrapperSdk() {
    if (typeof window !== 'undefined' && typeof window['SDK'] !== 'undefined') {
      window['SDK'].setIdentity('browser');
      return window['SDK'];
    }
    return null;
  }

  private static getCareMarkSdk() {
    if (typeof window !== 'undefined' && typeof window['CoreSdk'] !== 'undefined') {
      return  new window['CoreSdk'].Index('browser');
    }
    return null;
  }

  constructor(private configService: ConfigService, private vordelPbmService: VordelPbmService) {
    this.sdkInstance = CaremarkSdkService.getCareMarkWrapperSdk();
  }

  private setAuthConfigParams(params): void {
    params.env = this.configService.env;
    params.apiKey = this.configService.apiKey;
    params.apiSecret = this.configService.apiSecret;
    params.tokenId = this.configService.token;
    params.memberInfo = {
      'tokenId': this.configService.token,
    };
  }

  public getMemberDetails(): Promise<any> {

    return new Promise((resolve, reject) => {
      const params: any = {};

      if (!this.sdkInstance) {
        const error = {error: 'SDK Not Initialized'};
        console.error(JSON.stringify(error));
        return reject(error);
      }
      this.setAuthConfigParams(params);

      this.sdkInstance.Member.getDetails(params, (result) => {
        if (result.Header.StatusCode === '0000') {
          // console.log(JSON.stringify(result.Details));
          return resolve(result.Details);
        }
        console.error(JSON.stringify(result.Header));
        return reject(result.Header);
      });

    });
  }

  public getOrderStatus(): Promise<any> {

    return new Promise((resolve, reject) => {
      const params: any = {};

      if (!this.sdkInstance) {
        const error = {error: 'SDK Not Initialized'};
        console.error(JSON.stringify(error));
        return reject(error);
      }
      this.setAuthConfigParams(params);
      params.historyCount = '30';
      params.historyMetric = 'days';
      params.fastStartOrders = true;
      params.mailOrders = true;
      // console.log(JSON.stringify(params));
      this.sdkInstance.Order.getOrderStatus(params, (result) => {
        // console.log(JSON.stringify(result));
        if (result.Header.StatusCode === '0000') {
          return resolve(result.Details.Results);
        }
        if (result.Header.StatusCode === '5000' && result.Header.StatusDescription.toUpperCase() === 'No Orders found.'.toUpperCase()) {
          return resolve({Results: []});
        }
        console.error(JSON.stringify(result.Header));
        return reject(result);
      });
    });
  }

  public getRefills(): Promise<any> {

    return new Promise((resolve, reject) => {
      const params: any = {};

      if (!this.sdkInstance) {
        const error = {error: 'SDK Not Initialized'};
        console.error(JSON.stringify(error));
        return reject(error);
      }
      this.setAuthConfigParams(params);
      // caremark SDK fails on setting memberInfo
      params.memberInfo = undefined;
      this.sdkInstance.Drug.getRefills(params, (result) => {
        if (result.Header.StatusCode === '0000') {
          return resolve(result.Details);
        }
        console.error(JSON.stringify(result.Header));
        return reject(result.Header);
      });
    });
  }

  public getRefillsCount(): Promise<any> {
    return this.vordelPbmService.getRefillsCount();
/*
    return new Promise((resolve, reject) => {
      const params: any = {};
     return this.vordelPbmService.getRefillsCount();
    });*/
  }

  public getPznByIdAndResource(params: any): Promise<any> {
    return this.vordelPbmService.getPznByIdAndResource(params);
  }

}
