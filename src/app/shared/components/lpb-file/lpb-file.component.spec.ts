import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpbFileComponent } from './lpb-file.component';

describe('LpbFileComponent', () => {
  let component: LpbFileComponent;
  let fixture: ComponentFixture<LpbFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LpbFileComponent]
    });
    fixture = TestBed.createComponent(LpbFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
