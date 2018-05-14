import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderStatusComponent} from './order-status.component';
import {TealiumUtagService} from '../service/utag.service';
import {ConfigService} from "../service/config.service";

xdescribe('OrderStatusComponent', () => {
  let component: OrderStatusComponent;
  let fixture: ComponentFixture<OrderStatusComponent>;
  let mockTealiumUtagService: TealiumUtagService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderStatusComponent],
      providers: [TealiumUtagService, ConfigService,
        // {provide: ConfigService, useValue: {orderStatusUrl: '/wps/myportal/ORDER_STATUS'}},
        {provide: window.parent.location.href, useValue: '/'}
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(OrderStatusComponent);
        component = fixture.componentInstance;
        mockTealiumUtagService = TestBed.get(TealiumUtagService);
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should process the TAGS', () => {
    let result = {
      key_activity: 'new dashboard view orders',
      link_name: 'Custom: New Dashboard view orders clicked'
    };
    spyOn(mockTealiumUtagService, 'link').and.returnValue(result);
    component.orderClickTag();
    expect(component.orderStatusWT).toEqual(result);
  });
});
