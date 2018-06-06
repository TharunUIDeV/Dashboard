import {Injectable} from '@angular/core';
import {CaremarkDataServiceInterface} from './caremark-data.service.interface';
import * as MockOrderStatusData from '../../assets/mock-data/mock-ice-order-status.json';
import * as MockGetPznByIdAndResource from '../../assets/mock-data/mock-getPznByIdAndResource-data.json';

@Injectable()
export class MockIceSdkService implements CaremarkDataServiceInterface {

  constructor() {}

  public getMemberDetails(): Promise<any> {

    return new Promise((resolve, reject) => {
      reject('Not Implemented yet');
    });
  }

  public getOrderStatus(): Promise<any> {

    return new Promise((resolve, reject) => {
      resolve((<any>MockOrderStatusData).Details);
    });
  }

  public getRefills(): Promise<any> {

    return new Promise((resolve, reject) => {
      reject('Not Implemented yet');
    });
  }

  public getRefillsCount(): Promise<any> {

    return new Promise((resolve, reject) => {
      reject('Not Implemented yet');
    });
  }

  public getPznByIdAndResource(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve((<any>MockGetPznByIdAndResource).response.detail);
    });
  }

}
