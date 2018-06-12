import {Injectable} from '@angular/core';
import {CaremarkDataServiceInterface} from './caremark-data.service.interface';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {ConfigService} from './config.service';
import {VordelPbmService} from './vordel-pbm.service';
import * as moment from 'moment';

const enum QUERY_CONSTANTS {
  LINE_OF_BUSINESS = 'ICE',
  DEVICE_ID = 'device12345',
  DEVICE_TOKEN = '7777',
  CHANNEL_NAME = 'MOBILE',
  DEVICE_TYPE = 'DESKTOP',
  APP_NAME = 'ICE_WEB',
  SOURCE = 'CMK_WEB',
  PBM_SOURCE = 'pbm'
}

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class IceSdkService implements CaremarkDataServiceInterface {
  private baseUrl = this.configService.iceApiBaseUrl;
  private iceToken;

  constructor(private httpClient: HttpClient,
              private configService: ConfigService,
              private vordelPbmService: VordelPbmService) {
    this.getIceAuthenticationToken().then((iceToken) => { this.iceToken = iceToken; });
  }

  static createQueryString(data: any): string {
    const queryParam = [];
    Object.keys(data).forEach((key) => {
      queryParam.push(key + '=' + data[key]);
    });
    return queryParam.join('&');
  }

  getMemberDetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      reject('Not implemented yet');
    });
  }

  getOrderStatus(): Promise<any> {
    return new Promise((resolve, reject) => {
      const endDate = moment().format('YYYY-MM-DD');
      const startDate = moment(endDate).subtract(30, 'days').format('YYYY-MM-DD');
      const iceUrl = this.buildIceServiceUrl('getRxStatusSummary?') +
        IceSdkService.createQueryString(this.generateQueryParams('getRxStatusSummary'));
      const body = {
        'request': {
          'tokenID': '',
          'prescriptionHistoryInfo': {
            'consumerKey': this.configService.iceApiKey,
            'endDate': endDate,
            'estimateDrugCost': 'N',
            'financialSummary': 'N',
            'includeCompetitorRx': 'N',
            'includeFillHistory': 'Y',
            'scriptSyncEligIndicator': 'Y',
            'startDate': startDate,
            'statusSummary': 'Y',
            'systemIdentifier': 'ICE',
          }
        }
      };
      this.getIceAuthenticationToken().then((iceToken) => {
        this.iceToken = iceToken;
        body.request.tokenID = this.iceToken;
        this.httpClient.post(iceUrl, body, HTTP_OPTIONS)
          .pipe(
            catchError(this.handleError)
          ).subscribe((result) => {
          if (result.Header.StatusCode === '0000') {
            return resolve(result.response.detail);
          }
          console.error(JSON.stringify(result.Header));
          return reject(result.Header);
        }, (error) => reject(error));
      });
    });
  }

  getRefills(): Promise<any> {
    return new Promise((resolve, reject) => {
      reject('Not implemented yet');
    });
  }


  public getPznByIdAndResource(params: any): Promise<any> {
    return this.vordelPbmService.getPznByIdAndResource(params);
  }

  async getRefillsCount(): Promise<any> {
    let iceTokenId;
    // Use iceToken coming from Portal else invoke the IceAuthentication Method call.
    iceTokenId = await this.getIceAuthenticationToken();
    console.log(`Ice Token Received.. Moving to invoke RxStatusSummary : ${JSON.stringify(iceTokenId)}`);
    return new Promise((resolve, reject) => {
      const endDate = moment().format('YYYY-MM-DD');
      const startDate = moment(endDate).subtract(720, 'days').format('YYYY-MM-DD');
      const requestBody = {
        'request': {
          'tokenID': iceTokenId,
          'prescriptionHistoryInfo': {
            'consumerKey': this.configService.iceApiKey,
            'endDate': endDate,
            'estimateDrugCost': 'Y',
            'financialSummary': 'N',
            'includeCompetitorRx': 'Y',
            'includeFillHistory': 'Y',
            'scriptSyncEligIndicator': 'Y',
            'startDate': startDate,
            'statusSummary': 'Y',
            'systemIdentifier': 'ICE',
          }
        }
      };
      let refillCount = 0;
      let iceStatusSummaryResponse = null;
      const iceUrl = this.buildIceServiceUrl('getRxStatusSummary?') +
        IceSdkService.createQueryString(this.generateQueryParams('getRxStatusSummary'));

      this.httpClient.post(iceUrl, requestBody, HTTP_OPTIONS)
        .subscribe((summaryResp) => {
          iceStatusSummaryResponse = summaryResp;
          if (iceStatusSummaryResponse &&
            iceStatusSummaryResponse.response.header &&
            iceStatusSummaryResponse.response.header.statusCode === '0000') {
            refillCount = iceStatusSummaryResponse.response.detail.prescriptionHistoryDetails.statusSummary.rxReadyToFillCount;
            console.log(`Rx Count Received from the service. Final Step`);
            return resolve({refillsAvailable: refillCount});
          } else {
            return reject(iceStatusSummaryResponse.Header);
          }
        });
    });
  }

  public getIceAuthenticationToken() {
    return new Promise((resolve) => {
      let authTokenResponse: any;
      let authIceToken = '';
      const authUrl = this.buildIceServiceUrl('authentication?') +
        IceSdkService.createQueryString(this.generateQueryParams('authentication'));
      const requestBody = {
        'request': {
          'source': QUERY_CONSTANTS.PBM_SOURCE,
          'pbmTokenId': this.configService.token
        }
      };
      if (!this.iceToken) {
        this.httpClient.post(authUrl, JSON.stringify(requestBody), HTTP_OPTIONS)
          .subscribe((resp) => {
              authTokenResponse = resp;
              if (authTokenResponse && authTokenResponse.response.detail) {
                authIceToken = authTokenResponse.response.detail.tokenID;
                console.log(`Authentication Service for Token Invoked. : ${JSON.stringify(authIceToken)}`);
                return resolve(authIceToken);
              }
            },
            err => {
              console.log(`In Error: ${JSON.stringify(err)}`);
              return this.handleError(err);
            });
      }
      return resolve(this.iceToken);
    });
  }

  /*
    Helper Methods
   */
  public buildIceServiceUrl(serviceType): string {
    return this.configService.apiBaseUrl + serviceType;
  }

  generateQueryParams(serviceType: string): any {
    let urlPathParams: any;
    if (serviceType === 'getRxStatusSummary') {
      urlPathParams = {
        version: '7.0',
        serviceName: 'getRxStatusSummary',
        operationName: 'getRxStatusSummary',
        appName: QUERY_CONSTANTS.APP_NAME,
        channelName: QUERY_CONSTANTS.CHANNEL_NAME,
        deviceType: QUERY_CONSTANTS.DEVICE_TYPE,
        deviceToken: QUERY_CONSTANTS.DEVICE_TOKEN,
        lineOfBusiness: QUERY_CONSTANTS.LINE_OF_BUSINESS,
        xmlFormat: 'False',
        apiKey: this.configService.iceApiKey
      };
    } else if (serviceType === 'authentication') {
      urlPathParams = {
        version: '8.0',
        serviceName: 'authentication',
        operationName: 'authenticateToken',
        appName: QUERY_CONSTANTS.APP_NAME,
        channelName: QUERY_CONSTANTS.CHANNEL_NAME,
        deviceType: QUERY_CONSTANTS.DEVICE_TYPE,
        deviceToken: QUERY_CONSTANTS.DEVICE_TOKEN,
        lineOfBusiness: QUERY_CONSTANTS.LINE_OF_BUSINESS,
        xmlFormat: 'False',
        apiKey: this.configService.iceApiKey,
        source: QUERY_CONSTANTS.SOURCE,
        apiSecret: this.configService.iceApiSecret
      };
    }
    return urlPathParams;
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return Observable.throw(res.error || 'Server error');
  }
}
