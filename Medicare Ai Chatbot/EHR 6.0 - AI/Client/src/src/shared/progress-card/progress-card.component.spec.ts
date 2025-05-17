import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressCardComponent } from './progress-card.component';

describe('ProgressCardComponent', () => {
  let component: ProgressCardComponent;
  let fixture: ComponentFixture<ProgressCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressCardComponent]
    });
    fixture = TestBed.createComponent(ProgressCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
