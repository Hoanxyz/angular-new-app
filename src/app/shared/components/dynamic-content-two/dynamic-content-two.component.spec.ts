import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicContentTwoComponent } from './dynamic-content-two.component';

describe('DynamicContentTwoComponent', () => {
  let component: DynamicContentTwoComponent;
  let fixture: ComponentFixture<DynamicContentTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicContentTwoComponent]
    });
    fixture = TestBed.createComponent(DynamicContentTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
