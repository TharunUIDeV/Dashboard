import { TestBed, inject } from '@angular/core/testing';

import { CaremarkSdkService } from './caremark-sdk.service';

describe('CaremarkSdkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaremarkSdkService]
    });
  });

  xit('should be created', inject([CaremarkSdkService], (service: CaremarkSdkService) => {
    expect(service).toBeTruthy();
  }));
});
