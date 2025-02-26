import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpbMoneyInputNewComponent } from './lpb-money-input-new.component';

describe('LpbMoneyInputNewComponent', () => {
  let component: LpbMoneyInputNewComponent;
  let fixture: ComponentFixture<LpbMoneyInputNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LpbMoneyInputNewComponent]
    });
    fixture = TestBed.createComponent(LpbMoneyInputNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
