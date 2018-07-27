import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {PlanSummaryComponent} from './plan-summary.component';
import {PlanSummaryService} from '../service/plan-summary.service';

xdescribe('PlanSummaryComponent', () => {
  let component: PlanSummaryComponent;
  let fixture: ComponentFixture<PlanSummaryComponent>;
  const mockPlanSummaryService = { getPlanSummaryData: () => {} };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanSummaryComponent],
      providers: [
        {provide: PlanSummaryService, useValue: mockPlanSummaryService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
