import {TestBed, inject} from '@angular/core/testing';

import {IceSdkService} from './ice-sdk.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {ConfigService} from './config.service';
import {VordelPbmService} from './vordel-pbm.service';

describe('IceSdkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IceSdkService,
        HttpClient,
        ConfigService,
        VordelPbmService,
        HttpHandler
      ]
    }).compileComponents();
  });

  it('should be created', inject([IceSdkService], (service: IceSdkService) => {
    expect(service).toBeTruthy();
  }));
});
