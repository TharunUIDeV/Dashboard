import { TestBed, inject } from '@angular/core/testing';

import { OrderStatusService } from './order-status.service';
import {CaremarkDataService} from '../service/caremark-data.service';
import {ConfigService} from '../service/config.service';
import {CaremarkSdkService} from '../service/caremark-sdk.service';
import {IceSdkService} from '../service/ice-sdk.service';
import {VordelPbmService} from '../service/vordel-pbm.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {MemberService} from '../service/member.service';

describe('OrderStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderStatusService,
        CaremarkDataService,
        ConfigService,
        MemberService,
        CaremarkSdkService,
        IceSdkService,
        VordelPbmService,
        HttpClient,
        HttpHandler,
      ]
    });
  });

  it('should be created', inject([OrderStatusService], (service: OrderStatusService) => {
    expect(service).toBeTruthy();
  }));
});
