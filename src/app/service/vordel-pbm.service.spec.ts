import { TestBed, inject } from '@angular/core/testing';

import { VordelPbmService } from './vordel-pbm.service';

describe('VordelPbmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VordelPbmService]
    });
  });

  xit('should be created', inject([VordelPbmService], (service: VordelPbmService) => {
    expect(service).toBeTruthy();
  }));
});
