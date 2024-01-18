import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewYearComponent } from './new-year.component';

describe('NewYearComponent', () => {
  let component: NewYearComponent;
  let fixture: ComponentFixture<NewYearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewYearComponent]
    });
    fixture = TestBed.createComponent(NewYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
