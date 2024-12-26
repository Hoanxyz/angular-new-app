import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseQuantityComponent } from './choose-quantity.component';

describe('ChooseQuantityComponent', () => {
  let component: ChooseQuantityComponent;
  let fixture: ComponentFixture<ChooseQuantityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseQuantityComponent]
    });
    fixture = TestBed.createComponent(ChooseQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
