import {ConfigService} from './config.service';
import {BrowserService} from './browser.service';
import {FrameService} from './frame.service';
import {TealiumUtagService} from './utag.service';
import {CaremarkSdkService} from './caremark-sdk.service';
import {CaremarkDataService} from './caremark-data.service';
import {IceSdkService} from './ice-sdk.service';
import {VordelPbmService} from './vordel-pbm.service';

export const services: any  = [
  ConfigService,
  BrowserService,
  FrameService,
  TealiumUtagService,
  CaremarkSdkService,
  CaremarkDataService,
  IceSdkService,
  VordelPbmService,
];


export *  from './config.service';
export *  from './browser.service';
export * from  './frame.service';


export * from './utag.service';
export * from  './caremark-data.service';

export * from './caremark-sdk.service';
export * from  './ice-sdk.service';
export * from './vordel-pbm.service';
