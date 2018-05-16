import {Injectable} from '@angular/core';
import {CaremarkDataServiceInterface} from './caremark-data.service.interface';
import {ConfigService} from './config.service';
import {CaremarkSdkService} from './caremark-sdk.service';
import {IceSdkService} from './ice-sdk.service';

@Injectable()
export class CaremarkDataService implements CaremarkDataServiceInterface {
  private dataSource = 'pbm';

  constructor(private configService: ConfigService,
              private caremarkSdkService: CaremarkSdkService,
              private iceSdkService: IceSdkService) {
  }

  getMemberDetails(): Promise<any> {
    if (this.dataSource === 'ice') {
      return this.iceSdkService.getMemberDetails();
    }
    if (this.dataSource === 'pbm') {
      return this.caremarkSdkService.getMemberDetails();
    }
    return undefined;
  }

  getOrderStatus(): Promise<any> {
    if (this.dataSource === 'ice') {
      return this.iceSdkService.getOrderStatus();
    }
    if (this.dataSource === 'pbm') {
      return this.caremarkSdkService.getOrderStatus();
    }
    return undefined;
  }

  getRefills(): Promise<any> {
    this.dataSource = 'ice';
    if (this.dataSource === 'ice') {
      return this.iceSdkService.getRefills();
    }
    if (this.dataSource === 'pbm') {
      return this.caremarkSdkService.getRefills();
    }
    return undefined;
  }

}
