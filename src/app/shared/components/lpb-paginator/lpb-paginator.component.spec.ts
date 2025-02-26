import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpbPaginatorComponent } from './lpb-paginator.component';

describe('LpbPaginatorComponent', () => {
  let component: LpbPaginatorComponent;
  let fixture: ComponentFixture<LpbPaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LpbPaginatorComponent]
    });
    fixture = TestBed.createComponent(LpbPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
