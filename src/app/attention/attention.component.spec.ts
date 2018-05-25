import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttentionComponent } from './attention.component';

describe('AttentionComponent', () => {
  let component: AttentionComponent;
  let fixture: ComponentFixture<AttentionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttentionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
