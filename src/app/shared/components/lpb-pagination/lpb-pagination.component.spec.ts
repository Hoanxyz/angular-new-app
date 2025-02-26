import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpbPaginationComponent } from './lpb-pagination.component';

describe('LpbPaginationComponent', () => {
  let component: LpbPaginationComponent;
  let fixture: ComponentFixture<LpbPaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LpbPaginationComponent]
    });
    fixture = TestBed.createComponent(LpbPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
