import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisModalComponent } from './analysis-modal.component';

describe('AnalysisModalComponent', () => {
  let component: AnalysisModalComponent;
  let fixture: ComponentFixture<AnalysisModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalysisModalComponent]
    });
    fixture = TestBed.createComponent(AnalysisModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
