import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUpdateAccountComponent } from './dashboard-update-account.component';

describe('DashboardUpdateAccountComponent', () => {
  let component: DashboardUpdateAccountComponent;
  let fixture: ComponentFixture<DashboardUpdateAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardUpdateAccountComponent]
    });
    fixture = TestBed.createComponent(DashboardUpdateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
