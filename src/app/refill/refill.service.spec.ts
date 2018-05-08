import { TestBed, inject } from '@angular/core/testing';

import { RefillService } from './refill.service';

describe('RefillService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: RefillService, useValue: {sdkInstance: window['SDK']}}],
    });
  });

  it('should be created', inject([RefillService], (service: RefillService) => {
    expect(service).toBeTruthy();
  }));
});
