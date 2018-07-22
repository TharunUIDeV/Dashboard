import { TestBed, inject } from '@angular/core/testing';

import { CaremarkSdkService } from './caremark-sdk.service';
import {VordelPbmService} from './vordel-pbm.service';
import {ConfigService} from './config.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {SessionManager} from './session-manager';

describe('CaremarkSdkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CaremarkSdkService,
        VordelPbmService,
        ConfigService,
        HttpClient,
        HttpHandler,
        SessionManager
      ]
    });
  });

  it('should be created', inject([CaremarkSdkService], (service: CaremarkSdkService) => {
    expect(service).toBeTruthy();
  }));
});
