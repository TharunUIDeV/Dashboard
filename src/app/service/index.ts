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
import {OrderStatusFilterPipe} from '../order-status/order-status-filter.pipe';


const caremarkSdkServiceFactory = (configService: ConfigService, vordelPbmService: VordelPbmService)  => {
  if (environment.production) {
    return new CaremarkSdkService(configService, vordelPbmService);
  } else if (environment.mock) {
    return new MockCaremarkSdkService();
  } else {
    return new CaremarkSdkService(configService, vordelPbmService);
  }
};

export const CareMarkSdkServiceProvider = { provide: CaremarkSdkService,
  useFactory: caremarkSdkServiceFactory, deps: [ConfigService, VordelPbmService]};



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
