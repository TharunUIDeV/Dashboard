import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TealiumUtagService} from "./service/utag.service";
import {ConfigService} from "./service/config.service";

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

  it(`should have as title 'app'`, async(() => {
    expect(sut.getTitle()).toEqual('Hello John');
  }));

  it('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('John');
  }));
});
