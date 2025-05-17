import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictDiseaseComponent } from './predict-disease.component';

describe('PredictDiseaseComponent', () => {
  let component: PredictDiseaseComponent;
  let fixture: ComponentFixture<PredictDiseaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PredictDiseaseComponent]
    });
    fixture = TestBed.createComponent(PredictDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
