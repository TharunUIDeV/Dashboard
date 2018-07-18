import {Injectable} from '@angular/core';
import {CaremarkDataServiceInterface} from './caremark-data.service.interface';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map, mergeMap, tap, flatMap, switchMap} from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';
import {ConfigService} from './config.service';
import * as xml2js from 'xml2js';
import * as x2js from 'x2js';
import {of} from 'rxjs/observable/of';
import {observable} from 'rxjs/symbol/observable';
import {SessionManager} from './session-manager';

@Injectable()
export class VordelPbmService implements CaremarkDataServiceInterface {
  private baseUrl = this.configService.apiBaseUrl;
  private QueryConstants = {
    'lineOfBusiness': 'PBM',
    'deviceID': 'device12345',
    'deviceToken': 'device12345',
    'channelName': 'WEB',
    'deviceType': 'DESKTOP',
    'appName': 'CMK_WEB'
  };
  private xml2jsParser = new xml2js.Parser({explicitArray: false, cdata: true});
  private xml2jsXmlBuilder = new xml2js.Builder();
  private x2jsParser = new x2js({keepCData: true});


  constructor(private httpClient: HttpClient,
              private configService: ConfigService,
              private sessionManager: SessionManager) {
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

  public getPznByIdAndResource(params: any) {

    return new Promise((resolve, reject) => {

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
          'Content-Type': 'application/xml'
        }),
        responseType: 'text' as 'text',
      };

      const body: any = {};

      if (params && params.pznId && params.resourceTags) {
        body.personalizationServiceRequest = {'pznID': params.pznId, tag: []};
        for (const resourceTag of params.resourceTags) {
          body.personalizationServiceRequest.tag.push({'resourceTag': resourceTag});
        }

        const body_xml = this.xml2jsXmlBuilder.buildObject(body);


        return this.httpClient.post(url, body_xml, httpOptions)
          .pipe(
            catchError(this.handleError)
          ).subscribe((result) => {
            this.xml2jsParser.parseString(result, (error, jsonData) => {
              if (error) {
                console.log(error);
                return reject(error);
              }
              // console.log(JSON.stringify(jsonData));
              const response = jsonData.response;
              if (response.header.statusCode === '0000') {
                // console.log(JSON.stringify(response.detail));
                if (response && response.detail && response.detail.detail
                  && response.detail.detail.personalizationContent
                  && response.detail.detail.personalizationContent.personalizationContents) {
                  return resolve(response.detail.detail.personalizationContent.personalizationContents);
                }
                console.error(JSON.stringify(response.header));
              }
              return reject(response.header);
            });
          }, error => {
            reject(error);
          });
      }
      reject('getPznByIdandResource: Invalid Parameters');
    });
  }

  public getOrderStatus() {
    return new Promise((resolve, reject) => {

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
          'Content-Type': 'application/xml'
        }),
        responseType: 'text' as 'text',
      };

      this.httpClient.post(url, undefined, httpOptions)
        .pipe(
          catchError(this.handleError)
        ).subscribe((result) => {
        this.xml2jsParser.parseString(result, (error, jsonData) => {
          if (error) {
            console.error('failed to do xml2json parsing in getOrderStatus');
            return reject(error);
          }
          const response = jsonData.response;

          if (response.header.statusCode === '0000') {
            return resolve(response.details);
          }
          console.error(JSON.stringify(response.header));
          return reject(response.header);
        });
      }, error => reject(error));
    });
  }

  public getDrugByName(searchText): any {
    const queryParam: any = {
      apiKey: this.configService.apiKey,
      apiSecret: this.configService.apiSecret,
      appName: this.QueryConstants.appName,
      channelName: this.QueryConstants.channelName,
      deviceType: this.QueryConstants.deviceType,
      tokenID: this.configService.token,
      drugName: searchText,
      memberID: this.configService.memberId,
      lineOfBusiness: this.QueryConstants.lineOfBusiness,
      serviceCORS: 'TRUE',
      version: '1.0',
      deviceID: this.QueryConstants.deviceID,
      deviceToken: this.QueryConstants.deviceToken,
      serviceName: 'drugDetails',
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/xml'
      }),
      responseType: 'text' as 'text',
    };
    let url;

    if (!searchText) {
      Observable.throw('Invaid input parameters');
    }

    return this.getMemberDetails().pipe(
      map( (memberInfo: any) => {
        queryParam.memberID = memberInfo.internalID;
        url = this.baseUrl + 'drug/drugDetails?' + VordelPbmService.createQueryString(queryParam);
        return url;
      }),
      flatMap( (finalUrl: string) => {
      return this.httpClient.post(finalUrl, undefined, httpOptions)
        .map( (result) => {
          const resultJson: any = this.x2jsParser.xml2js(result);
          const response: any = resultJson.response;

          if (response.header.statusCode === '0000') {
            // console.log(response.detail.drugDetailsList);
            return response.detail.drugDetailsList.drug;
          } else if (response.header.statusCode === '2020') {
            throw new Error(
            'No results found. Check your spelling or enter just the first 3 letters of the drug you wish to price, then try again.'
            );
          }
          console.error(JSON.stringify(response.header));
          throw new Error('Some parts of Caremark.com may be unavailable at this time. If the problem persists, please call Customer Care at the number on your prescription benefit ID card.');
        });
    })
    );
  }

  public getDefaultPharmacy(): any {
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
      serviceName: 'primaryPharmacy',
      preferredPharmacy: 'BLNK',
      operationName: 'getDefaultPharmacy',
      env: this.configService.env
    };

    const url = this.baseUrl + 'pharmacy/getDefaultPharmacy?' + VordelPbmService.createQueryString(queryParam);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/xml'
      }),
      responseType: 'text' as 'text',
    };

    return this.httpClient.post(url, undefined, httpOptions)
      .pipe(
        map((result) => {
          const resultJson: any = this.x2jsParser.xml2js(result);
          const response = resultJson.response;

          if (response.header.statusCode === '0000') {
            return response.pharmacy;
          }
          console.error(JSON.stringify(response.header));
          // throw new Error(response.header);
          throw new Error(response.header || 'Server error');
        })
      );
  }

  public getMemberDetails(): any {
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
      serviceName: 'getMemberInfoByToken',
      env: this.configService.env
    };

    const url = this.baseUrl + 'refill/getMemberInfoByToken?' + VordelPbmService.createQueryString(queryParam);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/xml'
      }),
      responseType: 'text' as 'text',
    };

    const sessionMemberInfo = this.sessionManager.getMemberInfo();
    if (sessionMemberInfo) {
        return of(sessionMemberInfo);
    }

    return this.httpClient.post(url, undefined, httpOptions)
      .map(result => {
          const resultJson: any = this.x2jsParser.xml2js(result);
          const response = resultJson.response;

          if (response.header.statusCode === '0000') {
            this.sessionManager.setMemberInfo(response.detail.memberInfo);
            return response.detail.memberInfo;
          }
          console.error(JSON.stringify(response.header));
          throw new Error(response.header || 'Server error');
        });
  }

  public getRefillsCount() {

    return new Promise((resolve, reject) => {

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

      const url = this.baseUrl + 'refill/getRefills?' + VordelPbmService.createQueryString(queryParam);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/xml'
        }),
        responseType: 'text' as 'text',
      };


      this.httpClient.post(url, undefined, httpOptions)
        .pipe(
          catchError(this.handleError)
        ).subscribe((result) => {
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
          });

        },
        error => reject(error));
    });
  }

  public getRefills() {
    return new Promise((resolve, reject) => {
      const url = this.baseUrl + 'caremark/refill/getRefills/V2';
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/xml'
        }),
        responseType: 'text' as 'text',
      };

      const body = {
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

      return this.httpClient.post(url, body_xml, httpOptions)
        .pipe(
          catchError(this.handleError)
        ).subscribe((result) => {
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
            });

          },
          error => reject(error));
    });
  }

}
