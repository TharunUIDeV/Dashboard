import { TestBed, inject } from '@angular/core/testing';

import { PlanSummaryService } from './plan-summary.service';

describe('PlanSummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanSummaryService]
    });
  });

  it('should be created', inject([PlanSummaryService], (service: PlanSummaryService) => {
    expect(service).toBeTruthy();
  }));
});
