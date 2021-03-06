import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RecentOrdersComponent} from './recent-orders.component';
import {TealiumUtagService} from '../service/utag.service';
import {SpinnerComponent} from '../spinner/spinner.component';
import * as fromServices from '../service';
import {OrderStatusService} from '../order-status/order-status.service';

describe('RecentOrdersComponent', () => {
  let component: RecentOrdersComponent;
  let fixture: ComponentFixture<RecentOrdersComponent>;
  let mockTealiumUtagService: TealiumUtagService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecentOrdersComponent,
        SpinnerComponent,
      ],
      providers: [
        [...fromServices.services,
          OrderStatusService],
        {provide: window.parent.location.href, useValue: '/'}
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RecentOrdersComponent);
        component = fixture.componentInstance;
        mockTealiumUtagService = TestBed.get(TealiumUtagService);
        fixture.detectChanges();
      });
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should process the TAGS', () => {
    const result = {
      key_activity: 'new dashboard view orders',
      link_name: 'Custom: New Dashboard view orders clicked'
    };
    spyOn(mockTealiumUtagService, 'link').and.returnValue(result);
    // component.orderClickTag();
    expect(component.orderStatusWT).toEqual(result);
  });
});
