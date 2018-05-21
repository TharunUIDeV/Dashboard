import {Injectable} from '@angular/core';
import {CaremarkDataServiceInterface} from './caremark-data.service.interface';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {ConfigService} from './config.service';


@Injectable()
export class IceSdkService implements CaremarkDataServiceInterface {
  private baseUrl =  this.configService.apiBaseUrl;
  private QueryConstants = {
    'lineOfBusiness': 'ICE',
    'deviceID': 'device12345',
    'deviceToken': '7777',
    'channelName': 'MOBILE',
    'deviceType': 'DESKTOP',
    'appName': 'ICE_WEB',
    'source': 'CMK_WEB',
  };

  constructor(private http: HttpClient,
              private configService: ConfigService) {
  }

  static createQueryString(data: any): string {
    const queryParam = [];
    for (const key of Object.keys(data)) {
      queryParam.push(key + '=' + data[key]);
    }
    return queryParam.join('&');
  }


  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return Observable.throw(res.error || 'Server error');
  }

  private getRefillsObserve(): Observable<any> {

    const queryParam: any = {
      version: '7.0',
      serviceName: 'getRxStatusSummary',
      operationName: 'getRxStatusSummary',
      appName: this.QueryConstants.appName,
      channelName: this.QueryConstants.channelName,
      deviceType: this.QueryConstants.deviceType,
      deviceToken: this.QueryConstants.deviceToken,
      lineOfBusiness: this.QueryConstants.lineOfBusiness,
      xmlFormat: false,
      apiKey: this.configService.apiKey,
      apiSecret: this.configService.apiSecret,
      serviceCORS: 'TRUE',
    };


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'env': this.configService.env,
        'operation': 'getRxStatusSummary',
      })
    };

    const iceUrl = this.baseUrl + '/Services/icet/getRxStatusSummary?' + IceSdkService.createQueryString(queryParam);

    const body = {
      'request': {
        'tokenID': this.configService.token,
        'prescriptionHistoryInfo': {
          'consumerKey': this.configService.apiSecret,
          'scriptSyncEligIndicator': 'Y',
          'startDate': '2017-11-16',
          'systemIdentifier': 'ICE',
          'endDate': '2018-05-16',
          'statusSummary': 'Y',
          'financialSummary': 'N',
          'estimateDrugCost': 'Y',
          'includeCompetitorRx': 'Y',
          'includeFillHistory': 'Y'
        }
      }
    };

    return this.http.post<any>(iceUrl, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getMemberDetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      reject('Not implemented yet');
    });
  }

  getOrderStatus(): Promise<any> {
    return new Promise((resolve, reject) => {
      reject('Not implemented yet');
    });
  }

  getRefills(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getRefillsObserve().subscribe((result) => {
        if (result.Header.StatusCode === '0000') {
          return resolve(result.detail.prescriptionHistoryDetails);
        }
        console.error(JSON.stringify(result.Header));
        return reject(result.Header);
      });
    });
  }

}
