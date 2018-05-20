import { TestBed, inject } from '@angular/core/testing';

import { IceSdkService } from './ice-sdk.service';

describe('IceSdkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IceSdkService]
    });
  });

  it('should be created', inject([IceSdkService], (service: IceSdkService) => {
    expect(service).toBeTruthy();
  }));
});
