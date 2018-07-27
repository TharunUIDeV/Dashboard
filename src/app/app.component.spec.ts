import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TealiumUtagService} from './service/utag.service';
import {ConfigService} from './service/config.service';
import {BrowserService} from './service/browser.service';

describe('AppComponent', () => {
  let sut: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        TealiumUtagService,
        BrowserService,
        {provide: ConfigService, useValue: { participantFirstName: 'JOHN' }}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        sut = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create the app', async(() => {
    expect(sut).toBeTruthy();
  }));

});
