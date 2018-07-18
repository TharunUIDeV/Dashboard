import { TestBed, inject } from '@angular/core/testing';

import { MemberService } from './member.service';
import {CaremarkDataService} from './caremark-data.service';
import {ConfigService} from './config.service';
import {CaremarkSdkService} from './caremark-sdk.service';
import {VordelPbmService} from './vordel-pbm.service';
import {IceSdkService} from './ice-sdk.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {SessionManager} from './session-manager';

describe('MemberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MemberService,
        CaremarkDataService,
        ConfigService,
        CaremarkSdkService,
        VordelPbmService,
        IceSdkService,
        HttpClient,
        HttpHandler,
        SessionManager
      ]
    });
  });

  it('should be created', inject([MemberService], (service: MemberService) => {
    expect(service).toBeTruthy();
  }));
});
