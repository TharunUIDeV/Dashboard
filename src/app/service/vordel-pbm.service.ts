import { Injectable } from '@angular/core';
import {CaremarkDataServiceInterface} from './caremark-data.service.interface';
import * as MockOrderStatus from './mock-order-status-data.json';

@Injectable()
export class VordelPbmService implements CaremarkDataServiceInterface {

  constructor() { }

  getMemberDetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      reject('Not implemented yet');
    });
  }

  getOrderStatus(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve((<any>MockOrderStatus).Details);
    });
  }

  getRefills(): Promise<any> {
    return new Promise((resolve, reject) => {
      reject('Not implemented yet');
      });
  }

}
