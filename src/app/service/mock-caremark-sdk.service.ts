import {Injectable} from '@angular/core';
import {CaremarkDataServiceInterface} from './caremark-data.service.interface';
import * as MockOrderStatusData from './mock-order-status-data.json';

@Injectable()
export class MockCaremarkSdkService implements CaremarkDataServiceInterface {

  constructor() {}

  public getMemberDetails(): Promise<any> {

    return new Promise((resolve, reject) => {
      reject({error: 'Not implemented yet'});
    });
  }

  public getOrderStatus(): Promise<any> {

    return new Promise((resolve, reject) => {
      resolve((<any>MockOrderStatusData).Details);
    });
  }

  public getRefills(): Promise<any> {

    return new Promise((resolve, reject) => {
      reject({error: 'Not implemented yet'});
    });
  }

}
