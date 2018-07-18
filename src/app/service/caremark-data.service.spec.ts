import { TestBed, inject } from '@angular/core/testing';

import { CaremarkDataService } from './caremark-data.service';
import {ConfigService} from './config.service';
import {IceSdkService} from './ice-sdk.service';
import {VordelPbmService} from './vordel-pbm.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {CareMarkSdkServiceProvider, IceSdkServiceProvider} from './index';
import {CaremarkSdkService} from './caremark-sdk.service';
import {SessionManager} from './session-manager';

describe('CaremarkDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CaremarkDataService,
        ConfigService,
        IceSdkService,
        VordelPbmService,
        CaremarkSdkService,
        HttpClient,
        HttpHandler,
        SessionManager
      ]
    });
  });

  it('should be created', inject([CaremarkDataService], (service: CaremarkDataService) => {
    expect(service).toBeTruthy();
  }));
});
