import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DefaultRefillComponent} from './default-refill.component';
import {TealiumUtagService} from '../service/utag.service';
import {ConfigService} from '../service/config.service';
import {BrowserService} from '../service/browser.service';

describe('DefaultRefillComponent', () => {
  let component: DefaultRefillComponent;
  let fixture: ComponentFixture<DefaultRefillComponent>;
  let mockTealiumUtagService: TealiumUtagService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultRefillComponent],
      providers: [
        TealiumUtagService, BrowserService,
        {provide: ConfigService, useValue: {refillRxUrl: '/wps/myportal/REFILL_RX'}}
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DefaultRefillComponent);
        component = fixture.componentInstance;
        mockTealiumUtagService = TestBed.get(TealiumUtagService);
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should process the TAGS', () => {
    const result = {key_activity: 'new dashboard view prescriptions', link_name: 'Custom: New Dashboard view prescriptions clicked'};
    spyOn(mockTealiumUtagService, 'link').and.returnValue(result);
    component.refillClickTag();
    expect(component.webTrends).toEqual(result);
  });
});
