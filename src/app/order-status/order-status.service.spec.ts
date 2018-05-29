import { TestBed, inject } from '@angular/core/testing';

import { OrderStatusService } from './order-status.service';

describe('OrderStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderStatusService]
    });
  });

  xit('should be created', inject([OrderStatusService], (service: OrderStatusService) => {
    expect(service).toBeTruthy();
  }));
});
