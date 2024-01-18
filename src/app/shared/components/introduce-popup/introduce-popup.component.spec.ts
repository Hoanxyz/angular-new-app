import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroducePopupComponent } from './introduce-popup.component';

describe('IntroducePopupComponent', () => {
  let component: IntroducePopupComponent;
  let fixture: ComponentFixture<IntroducePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntroducePopupComponent]
    });
    fixture = TestBed.createComponent(IntroducePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
