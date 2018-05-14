import { Injectable } from '@angular/core';
import {CaremarkDataServiceInterface} from './caremark-data.service.interface';

@Injectable()
export class IceSdkService implements CaremarkDataServiceInterface{

  constructor() { }

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
      reject('Not implemented yet');
    });
  }

}
