import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RefillComponent} from './refill.component';
import {TealiumUtagService} from '../service/utag.service';
import {ConfigService} from "../service/config.service";
import {RefillService} from './refill.service';

describe('RefillComponent', () => {
  let component: RefillComponent;
  let fixture: ComponentFixture<RefillComponent>;
  let mockTealiumUtagService: TealiumUtagService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RefillComponent],
      providers: [
        TealiumUtagService,
        {provide: RefillService, useValue: {sdkInstance: window['SDK']}},
        {provide: ConfigService, useValue: {refillRxUrl: '/wps/myportal/REFILL_RX'},
        }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RefillComponent);
        component = fixture.componentInstance;
        mockTealiumUtagService = TestBed.get(TealiumUtagService);
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should process the TAGS', () => {
    let result = {key_activity: 'new dashboard view prescriptions', link_name: 'Custom: New Dashboard view prescriptions clicked'};
    spyOn(mockTealiumUtagService, 'link').and.returnValue(result);
    component.refillClickTag();
    expect(component.webTrends).toEqual(result);
  });
});
