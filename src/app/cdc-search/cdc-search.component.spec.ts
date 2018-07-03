import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CdcSearchComponent} from './cdc-search.component';
import {TealiumUtagService} from '../service/utag.service';
import {BrowserService} from '../service/browser.service';
import {ConfigService} from '../service/config.service';
import {CaremarkDataService} from '../service/caremark-data.service';
import {CdcHelperService} from './cdc-helper.service';
import {CaremarkSdkService} from '../service/caremark-sdk.service';
import {VordelPbmService} from '../service/vordel-pbm.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {IceSdkService} from '../service/ice-sdk.service';

xdescribe('CdcSearchComponent', () => {
  let component: CdcSearchComponent;
  let fixture: ComponentFixture<CdcSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CdcSearchComponent],
      providers: [TealiumUtagService,
        BrowserService,
        ConfigService,
        CaremarkDataService,
        CdcHelperService,
        CaremarkSdkService,
        VordelPbmService,
        HttpClient,
        HttpHandler,
        IceSdkService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdcSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
