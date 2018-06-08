import { TestBed, inject } from '@angular/core/testing';

import { VordelPbmService } from './vordel-pbm.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {ConfigService} from './config.service';

describe('VordelPbmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VordelPbmService,
        HttpClient,
        HttpHandler,
        ConfigService
      ]
    });
  });

  it('should be created', inject([VordelPbmService], (service: VordelPbmService) => {
    expect(service).toBeTruthy();
  }));
});
