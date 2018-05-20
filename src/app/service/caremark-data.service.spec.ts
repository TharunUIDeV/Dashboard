import { TestBed, inject } from '@angular/core/testing';

import { CaremarkDataService } from './caremark-data.service';

describe('CaremarkDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaremarkDataService]
    });
  });

  it('should be created', inject([CaremarkDataService], (service: CaremarkDataService) => {
    expect(service).toBeTruthy();
  }));
});
