import { Injectable } from '@angular/core';
import {CaremarkDataServiceInterface} from './caremark-data.service.interface';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';
import {ConfigService} from './config.service';
import * as xml2js from 'xml2js';

@Injectable()
export class VordelPbmService implements CaremarkDataServiceInterface {
  private baseUrl =  this.configService.apiBaseUrl;
  private QueryConstants = {
    'lineOfBusiness': 'PBM',
    'deviceID': 'device12345',
    'deviceToken': 'device12345',
    'channelName': 'WEB',
    'deviceType': 'DESKTOP',
    'appName': 'CMK_WEB'
  };
  private  xml2jsParser = new xml2js.Parser({explicitArray : false});
  private xml2jsXmlBuilder = new xml2js.Builder();


  constructor(private httpClient: HttpClient, private configService: ConfigService) { }


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

  private getPznByIdandResourceObserve(pznID, resourceTag, deliveryResourceTag): Observable<any> {

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
      version: '1.0',
      serviceName: 'personalization',
      operation: 'getPZNByIDandResourcetag',
    };

    const url = this.baseUrl + 'PZN/getPZNByIDandResourcetag?' + VordelPbmService.createQueryString(queryParam);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml'
      }),
      responseType: 'text' as 'text',
    };

    const body =  {
      'personalizationServiceRequest' : {
        'pznID': pznID,
        'tag': [
          { 'resourceTag': resourceTag },
          { 'resourceTag': deliveryResourceTag }
          ]
      }
    };

    const body_xml = this.xml2jsXmlBuilder.buildObject(body);


    return this.httpClient.post(url,  body_xml,   httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getPznByIdAndResource(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const pznId = params.pznId;
      const resourceTag = params.resourceTag;
      const deliveryResourceTag =  params.deliveryResourceTag;
      this.getPznByIdandResourceObserve(pznId, resourceTag, deliveryResourceTag).subscribe((result) => {
        this.xml2jsParser.parseString(result, (error, jsonData) => {
          if (error) {
            console.log(error);
            return reject(error);
          }
          const response = jsonData.response;
          if (response.header.statusCode === '0000') {
            // console.log(JSON.stringify(response.detail));
            return resolve(response.detail);
          }
          console.error(JSON.stringify(response.header));
          return reject(response.header);
        } );

      });
    });
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
          this.xml2jsParser.parseString(result, (error, jsonData) => {
            if (error) {
              console.error('failed to do xml2json parsing in getOrderStatus');
              return reject(error);
            }
            const response = jsonData.response;

          if (response.header.statusCode === '0000') {
            console.log(JSON.stringify(response.header.details));
            return resolve(response.details);
          }
          console.error(JSON.stringify(response.header));
          return reject(response.header);
        } );

      });
    });
  }

  private getRefillCountObserve(): Observable<any> {

    const queryParam: any = {
      apiKey: this.configService.apiKey,
      apiSecret: this.configService.apiSecret,
      appName: this.QueryConstants.appName,
      // channelName: this.QueryConstants.channelName,
      // deviceType: this.QueryConstants.deviceType,
      tokenID: this.configService.token,
      deviceID: this.QueryConstants.deviceID,
      // deviceToken: this.QueryConstants.deviceToken,
      // lineOfBusiness: this.QueryConstants.lineOfBusiness,
      serviceCORS: 'TRUE',
      version: '5.0',
      xmlFormat: 'True',
      serviceName: 'getRefills',
      operationName: 'getRefillCounts',
      estimatedCost: '1',
      familyRefills: 'TRUE',
      // env: this.configService.env
    };

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
        this.xml2jsParser.parseString(result, (error, jsonData) => {
          if (error) {
            console.error('failed in xml2js.parseString');
            return reject({error: 'failed to convert xml to json'});
          }
          const response = jsonData.response;
          // console.log(JSON.stringify(response));

          if (response.header.statusCode === '0000') {
            // console.log(JSON.stringify(response.detail));
            return resolve(response.detail);
          }
          console.error(JSON.stringify(response.header));
          return reject(response.header);
        } );

      },
        error => reject(error));
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

    const body_xml = this.xml2jsXmlBuilder.buildObject(body);

    return this.httpClient.post(url,  body_xml,   httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getRefills(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getRefillsObserve().subscribe((result) => {
        this.xml2jsParser.parseString(result, (error, jsonData) => {
          if (error) {
            console.log(error);
            return reject(error);
          }
          const response = jsonData.response;
          if (response.header.statusCode === '0000') {
            console.log(JSON.stringify(response.details));
            return resolve(response.details);
          }
          console.error(JSON.stringify(response.header));
          return reject(response.header);
        } );

      });
    });
  }

}