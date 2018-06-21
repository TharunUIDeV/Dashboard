import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AttentionComponent} from './attention.component';
import {FormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TealiumUtagService} from '../service/utag.service';
import {BrowserService} from '../service/browser.service';
import {ConfigService} from '../service/config.service';
import {OrderStatusService} from '../order-status/order-status.service';
import {CaremarkDataService} from '../service/caremark-data.service';
import {CaremarkSdkService} from '../service/caremark-sdk.service';
import {VordelPbmService} from '../service/vordel-pbm.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {IceSdkService} from '../service/ice-sdk.service';
import {MemberService} from '../service/member.service';
import {EccrService} from '../service/eccr.service';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from '../store/app.reducer';

describe('AttentionComponent', () => {
  let component: AttentionComponent;
  let fixture: ComponentFixture<AttentionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AttentionComponent],
      providers: [TealiumUtagService,
        BrowserService,
        ConfigService,
        OrderStatusService,
        CaremarkDataService,
        CaremarkSdkService,
        VordelPbmService,
        HttpClient,
        HttpHandler,
        IceSdkService,
        MemberService,
        EccrService],
      imports: [FormsModule,
        StoreModule.forRoot(reducers, { metaReducers })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttentionComponent);
    component = fixture.componentInstance;
    component.loading = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
