import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import {TealiumUtagService} from '../service/utag.service';
import {ObservableMedia} from '@angular/flex-layout';
import {ConfigService} from '../service/config.service';
import {BrowserService} from '../service/browser.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [TealiumUtagService, ObservableMedia, BrowserService,
        {provide: ConfigService, useValue: {participantFirstName:  'John'}}
        ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'app'`, async(() => {
    expect(component.getTitle()).toEqual('Hello John');
  }));

  it('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('John');
  }));
});
