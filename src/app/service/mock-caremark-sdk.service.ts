import {Injectable} from '@angular/core';
import {CaremarkDataServiceInterface} from './caremark-data.service.interface';
import * as MockOrderStatusData from './mock-order-status-data.json';
import * as MockGetRefillsData from './mock-get-refills-data.json';
import * as MockMemberInfo from './mock-get-memberinfo.json';
import * as MockGetRefillsCountData from './mock-getRefillsCount-data.json';

@Injectable()
export class MockCaremarkSdkService implements CaremarkDataServiceInterface {

  constructor() {}

  public getMemberDetails(): Promise<any> {

    return new Promise((resolve, reject) => {
      resolve((<any>MockMemberInfo).Details);
    });
  }

  public getOrderStatus(): Promise<any> {

    return new Promise((resolve, reject) => {
      resolve((<any>MockOrderStatusData).Details);
    });
  }

  public getRefills(): Promise<any> {

    return new Promise((resolve, reject) => {
      resolve((<any>MockGetRefillsData).Details);
    });
  }

  public getRefillsCount(): Promise<any> {

    return new Promise((resolve, reject) => {
      resolve((<any>MockGetRefillsCountData).detail);
    });
  }

}
