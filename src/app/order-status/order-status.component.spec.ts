import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusComponent } from './order-status.component';
import {TealiumUtagService} from "../service/utag.service";

describe('OrderStatusComponent', () => {
  let component: OrderStatusComponent;
  let fixture: ComponentFixture<OrderStatusComponent>;
  let mockTealiumUtagService: TealiumUtagService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStatusComponent ],
      providers: [TealiumUtagService]
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

  it('should process the TAGS', () => {
    let result = {
      key_activity: 'new dashboard view orders',
      link_name: 'Custom: New Dashboard view orders clicked'
    };
    spyOn(mockTealiumUtagService, 'link').and.returnValue(result);
    component.ngOnInit();
    expect(component.orderStatusWT).toEqual(result);
  });
});
