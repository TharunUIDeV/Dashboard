import {Injectable} from '@angular/core';
import {CaremarkDataServiceInterface} from './caremark-data.service.interface';
import {ConfigService} from './config.service';
import {CaremarkSdkService} from './caremark-sdk.service';
import {IceSdkService} from './ice-sdk.service';
import {VordelPbmService} from './vordel-pbm.service';

export enum DATASOURCE_TYPES {
  CAREMARK_SDK = 'caremark-sdk',
  VORDEL_PBM = 'vordel_pbm',
  VORDEL_ICE = 'vordel_ice',
}

@Injectable()
export class CaremarkDataService implements CaremarkDataServiceInterface {

  private _dataSource = undefined;
  private _serviceInstance = undefined;


  constructor(private configService: ConfigService,
              private caremarkSdkService: CaremarkSdkService,
              private iceSdkService: IceSdkService,
              private vordelPbmService: VordelPbmService) {
    // Set Defaults
    this.dataSource = DATASOURCE_TYPES.CAREMARK_SDK;
    // this.dataSource = DATASOURCE_TYPES.VORDEL_ICE;
  }

  set dataSource(value: DATASOURCE_TYPES) {
    this._dataSource = value;
    if (this._dataSource === DATASOURCE_TYPES.VORDEL_ICE) {
      this._serviceInstance = this.iceSdkService;
    }
    if (this._dataSource === DATASOURCE_TYPES.VORDEL_PBM) {
      this._serviceInstance = this.vordelPbmService;
    }
    if (this._dataSource === DATASOURCE_TYPES.CAREMARK_SDK) {
      this._serviceInstance = this.caremarkSdkService;
    }
  }

  get dataSource(): DATASOURCE_TYPES {
    return this._dataSource;
  }

  getMemberDetails(): Promise<any> {
    return this._serviceInstance.getMemberDetails();
  }

  getOrderStatus(): Promise<any> {
    return this._serviceInstance.getOrderStatus();
  }

  getRefills(): Promise<any> {
    return this._serviceInstance.getRefills();
  }

  getRefillsCount(): Promise<any> {
    return this._serviceInstance.getRefillsCount();
  }


}
