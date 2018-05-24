import {ConfigService} from './config.service';
import {BrowserService} from './browser.service';
import {FrameService} from './frame.service';
import {TealiumUtagService} from './utag.service';
import {CaremarkDataService} from './caremark-data.service';
import {IceSdkService} from './ice-sdk.service';
import {VordelPbmService} from './vordel-pbm.service';
import {CaremarkSdkService} from './caremark-sdk.service';
import {MockCaremarkSdkService} from './mock-caremark-sdk.service';
import {environment} from '../../environments/environment';
import {APP_INITIALIZER} from '@angular/core';
import {MemberService} from './member.service';
import {OrderStatusFilterPipe} from '../recent-orders/order-status-filter.pipe';


const caremarkSdkServiceFactory = (configService: ConfigService)  => {
  if (environment.production) {
    return new CaremarkSdkService(configService);
  } else if (environment.mock) {
    return new MockCaremarkSdkService();
  } else {
    return new CaremarkSdkService(configService);
  }
};

export const CareMarkSdkServiceProvider = { provide: CaremarkSdkService,
  useFactory: caremarkSdkServiceFactory, deps: [ConfigService]};



export function configServiceFactory(configSvc: ConfigService) {
  return () => configSvc.init;
}



export const services: any[]  = [
  {provide: APP_INITIALIZER, useFactory: configServiceFactory, deps: [ConfigService], multi: true},
  ConfigService,
  BrowserService,
  FrameService,
  TealiumUtagService,
  CareMarkSdkServiceProvider,
  CaremarkDataService,
  IceSdkService,
  VordelPbmService,
  MemberService,
  OrderStatusFilterPipe
];
