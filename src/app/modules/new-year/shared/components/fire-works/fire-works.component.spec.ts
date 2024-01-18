import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireWorksComponent } from './fire-works.component';

describe('FireWorksComponent', () => {
  let component: FireWorksComponent;
  let fixture: ComponentFixture<FireWorksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FireWorksComponent]
    });
    fixture = TestBed.createComponent(FireWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
