import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DefaultOrderStatusComponent} from './default-order-status.component';
import {TealiumUtagService} from '../service/utag.service';
import {ConfigService} from '../service/config.service';
import {BrowserService} from '../service/browser.service';

describe('DefaultOrderStatusComponent', () => {
  let component: DefaultOrderStatusComponent;
  let fixture: ComponentFixture<DefaultOrderStatusComponent>;
  let mockTealiumUtagService: TealiumUtagService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultOrderStatusComponent],
      providers: [TealiumUtagService, ConfigService, BrowserService,
        // {provide: ConfigService, useValue: {orderStatusUrl: '/wps/myportal/ORDER_STATUS'}},
        {provide: window.parent.location.href, useValue: '/'}
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DefaultOrderStatusComponent);
        component = fixture.componentInstance;
        mockTealiumUtagService = TestBed.get(TealiumUtagService);
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should process the TAGS', () => {
    const result = {
      key_activity: 'new dashboard view orders',
      link_name: 'Custom: New Dashboard view orders clicked'
    };
    spyOn(mockTealiumUtagService, 'link').and.returnValue(result);
    component.orderClickTag();
    expect(component.orderStatusWT).toEqual(result);
  });
});
