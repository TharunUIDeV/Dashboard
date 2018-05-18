import { Injectable } from '@angular/core';
import {CaremarkDataServiceInterface} from './caremark-data.service.interface';
import * as MockOrderStatus from './mock-order-status-data.json';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {ConfigService} from './config.service';
import * as xml2js from 'xml2js';

@Injectable()
export class VordelPbmService implements CaremarkDataServiceInterface {
  private params: any;
  private baseUrl =  'https://sit1pbmservices.caremark.com/';
  private QueryConstants = {
    'lineOfBusiness': 'PBM',
    'deviceID': 'device12345',
    'deviceToken': 'device12345',
    'channelName': 'WEB',
    'deviceType': 'DESKTOP',
    'appName': 'CMK_WEB'
  };


  constructor(private httpClient: HttpClient, private configService: ConfigService) { }


  static createQueryString(data: any): string {
    const queryParam = [];
    for (const key in data) {
      queryParam.push(key + '=' + data[key]);
    }
    return queryParam.join('&');
  }

  private convertXML2JSON(xmlText) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xmlText, (err, result) => {
        if (!err) {
          resolve(result.rss.channel.item);
        } else {
          reject(err);
        }
      });
    });
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return Observable.throw(res.error || 'Server error');
  }

  private getOrderStatusObserve(): Observable<any> {

    const queryParam: any = {
      apiKey: this.configService.apiKey,
      apiSecret: this.configService.apiSecret,
      appName: this.QueryConstants.appName,
      channelName: this.QueryConstants.channelName,
      deviceType: this.QueryConstants.deviceType,
      tokenID: this.configService.token,
      deviceID: this.QueryConstants.deviceID,
      deviceToken: this.QueryConstants.deviceToken,
      lineOfBusiness: this.QueryConstants.lineOfBusiness,
      serviceCORS: 'TRUE',
      version: '2.1',
      serviceName: 'orderStatus',
      transferOrders: false,
      historyCount: 365,
      historyMetric: 'days',
      componentId: 'orderStatus-v-1.0',
      fastStartOrders: false,
      fastIndicator: 'YES',
      mailOrders: true,
      env: this.configService.env
    };


    queryParam.env = 'SIT1';
    queryParam.tokenID = '1DE7D95CA13E392288C1D9D07FFF511A';

    const url = this.baseUrl + '/refill/orderStatus?' + VordelPbmService.createQueryString(queryParam);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml'
      }),
      responseType: 'text' as 'text',
    };


    return this.httpClient.post(url,  undefined,   httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  public getMemberDetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      reject('Not implemented yet');
    });
  }

  public getOrderStatus(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getOrderStatusObserve().subscribe((result) => {
          xml2js.parseString(result, (error, jsonData) => {
            console.log(JSON.stringify(jsonData));
            console.log(JSON.stringify(error));

          if (jsonData.Header.StatusCode === '0000') {
            console.log(JSON.stringify(result.Header.Details));
            return resolve(jsonData.Details);
          }
          console.error(JSON.stringify(jsonData.Header));
          return reject(jsonData.Header);
        } );

      });
    });
  }

  private getRefillCountObserve(): Observable<any> {

    const queryParam: any = {
      apiKey: this.configService.apiKey,
      apiSecret: this.configService.apiSecret,
      appName: this.QueryConstants.appName,
      channelName: this.QueryConstants.channelName,
      deviceType: this.QueryConstants.deviceType,
      tokenID: this.configService.token,
      deviceID: this.QueryConstants.deviceID,
      deviceToken: this.QueryConstants.deviceToken,
      lineOfBusiness: this.QueryConstants.lineOfBusiness,
      serviceCORS: 'TRUE',
      version: '5.0',
      serviceName: 'getRefills',
      operationName: 'getRefillCounts',
      estimatedCost: '1',
      familyRefills: 'TRUE',
      env: this.configService.env
    };


    queryParam.env = 'SIT1';
    queryParam.tokenID = '1DE7D95CA13E392288C1D9D07FFF511A';

    const url = this.baseUrl + '/refill/getRefills?' + VordelPbmService.createQueryString(queryParam);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml'
      }),
      responseType: 'text' as 'text',
    };


    return this.httpClient.post(url,  undefined,   httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getRefillsCount(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getRefillCountObserve().subscribe((result) => {
        xml2js.parseString(result, (error, jsonData) => {
          console.log(JSON.stringify(jsonData));
          console.log(JSON.stringify(error));

          if (jsonData.Header.StatusCode === '0000') {
            console.log(JSON.stringify(result.Header.Details));
            return resolve(jsonData.Details);
          }
          console.error(JSON.stringify(jsonData.Header));
          return reject(jsonData.Header);
        } );

      });
    });
  }

  private getRefillsObserve(): Observable<any> {
    const url = this.baseUrl + '/caremark/refill/getRefills/V2';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml'
      }),
      responseType: 'text' as 'text',
    };

    const body =  {
      'request': {
        'header': {
          'serviceContext': {
            'lineOfBusiness': this.QueryConstants.lineOfBusiness,
              'tokenID': this.configService.token,
              'appName': this.QueryConstants.appName,
              'channelName': this.QueryConstants.channelName,
              'deviceID': this.QueryConstants.deviceID,
              'deviceToken': this.QueryConstants.deviceToken,
              'deviceType': this.QueryConstants.deviceType
          },
          'securityContext': {
            'apiKey': this.configService.apiKey
          }
        },
        'details': {
          'wfc': 'RF',
            'xmlFormat': 'True',
            'estimatedCost': '2',
            'familyRefills': 'True'
        }
      }
    };

    //  hardcode for easy testing
    body.request.header.serviceContext.tokenID = 'FA5905D24F693874993589E9494DB479';

    const builder = new xml2js.Builder();
    const body_xml = builder.buildObject(body);

    return this.httpClient.post(url,  body_xml,   httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getRefills(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getRefillsObserve().subscribe((result) => {
        xml2js.parseString(result, (error, jsonData) => {
          console.log(JSON.stringify(jsonData));
          console.log(JSON.stringify(error));

          if (jsonData.Header.StatusCode === '0000') {
            console.log(JSON.stringify(result.Header.Details));
            return resolve(jsonData.Details);
          }
          console.error(JSON.stringify(jsonData.Header));
          return reject(jsonData.Header);
        } );

      });
    });
  }

}
