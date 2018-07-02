import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdcSearchComponent } from './cdc-search.component';

describe('CdcSearchComponent', () => {
  let component: CdcSearchComponent;
  let fixture: ComponentFixture<CdcSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdcSearchComponent ]
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
