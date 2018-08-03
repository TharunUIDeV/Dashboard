import { TestBed, inject } from '@angular/core/testing';

import { CaremarkSdkService } from './caremark-sdk.service';
import {VordelPbmService} from './vordel-pbm.service';
import {ConfigService} from './config.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('CaremarkSdkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CaremarkSdkService,
        VordelPbmService,
        ConfigService,
        HttpClient,
        HttpHandler,
      ]
    });
  });

  it('should be created', inject([CaremarkSdkService], (service: CaremarkSdkService) => {
    expect(service).toBeTruthy();
  }));
});
