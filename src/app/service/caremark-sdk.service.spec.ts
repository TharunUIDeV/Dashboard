import { TestBed, inject } from '@angular/core/testing';

import { CaremarkSdkService } from './caremark-sdk.service';

describe('CaremarkSdkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaremarkSdkService]
    });
  });

  it('should be created', inject([CaremarkSdkService], (service: CaremarkSdkService) => {
    expect(service).toBeTruthy();
  }));
});
