import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrisisCenterHomeComponent } from './crisis-center-home.component';

describe('CrisisCenterHomeComponent', () => {
  let component: CrisisCenterHomeComponent;
  let fixture: ComponentFixture<CrisisCenterHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrisisCenterHomeComponent]
    });
    fixture = TestBed.createComponent(CrisisCenterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
