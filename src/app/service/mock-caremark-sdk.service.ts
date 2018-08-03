import {Injectable} from '@angular/core';
import {CaremarkDataServiceInterface} from './caremark-data.service.interface';
import * as MockOrderStatusData from '../../assets/mock-data/mock-order-status-data.json';
import * as MockGetRefillsData from '../../assets/mock-data/mock-get-refills-data.json';
import * as MockMemberInfo from '../../assets/mock-data/mock-get-memberinfo.json';
import * as MockGetRefillsCountData from '../../assets/mock-data/mock-getRefillsCount-data.json';
import * as MockGetPznByIdAndResource from '../../assets/mock-data/mock-getPznByIdAndResource-data.json';

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
      resolve((<any>MockOrderStatusData).Details.Results);
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

  public getPznByIdAndResource(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve((<any>MockGetPznByIdAndResource).response.detail.detail.personalizationContent.personalizationContents);
    });
  }

}
