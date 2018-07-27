import { TestBed, inject } from '@angular/core/testing';
import { PlanSummaryService } from './plan-summary.service';
import {MemberService} from './member.service';
import {CaremarkDataService} from './caremark-data.service';
import {ConfigService} from './config.service';
import {BrowserService} from './browser.service';
import {CaremarkSdkService} from './caremark-sdk.service';
import {VordelPbmService} from './vordel-pbm.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {SessionManager} from './session-manager';
import {IceSdkService} from './ice-sdk.service';

describe('PlanSummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanSummaryService,
        MemberService,
        CaremarkDataService,
        MemberService,
        ConfigService,
        BrowserService,
        CaremarkSdkService,
        VordelPbmService,
        HttpClient,
        HttpHandler,
        SessionManager,
        IceSdkService
      ]
    });
  });

  it('should be created', inject([PlanSummaryService], (service: PlanSummaryService) => {
    expect(service).toBeTruthy();
  }));
});
