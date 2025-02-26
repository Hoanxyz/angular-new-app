import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpbDatepickerNewComponent } from './lpb-datepicker-new.component';

describe('LpbDatepickerNewComponent', () => {
  let component: LpbDatepickerNewComponent;
  let fixture: ComponentFixture<LpbDatepickerNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LpbDatepickerNewComponent]
    });
    fixture = TestBed.createComponent(LpbDatepickerNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
