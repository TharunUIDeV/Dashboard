import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RefillComponent} from './refill.component';
import {TealiumUtagService} from '../service/utag.service';
import {ConfigService} from '../service/config.service';
import {BrowserService} from '../service/browser.service';
import {CaremarkSdkService} from '../service/caremark-sdk.service';

describe('DefaultRefillComponent', () => {
  let component: RefillComponent;
  let fixture: ComponentFixture<RefillComponent>;
  let mockTealiumUtagService: TealiumUtagService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RefillComponent],
      providers: [
        TealiumUtagService, BrowserService,
        {provide: ConfigService, useValue: {refillRxUrl: '/wps/myportal/REFILL_RX'}},
        CaremarkSdkService,
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RefillComponent);
        component = fixture.componentInstance;
        mockTealiumUtagService = TestBed.get(TealiumUtagService);
      });
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should process the TAGS', () => {
    const result = {key_activity: 'new dashboard view prescriptions', link_name: 'Custom: New Dashboard view prescriptions clicked'};
    spyOn(mockTealiumUtagService, 'link').and.returnValue(result);
    component.refillClickTag();
    expect(component.webTrends).toEqual(result);
  });
});
