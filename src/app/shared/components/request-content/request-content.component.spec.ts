import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestContentComponent } from './request-content.component';

describe('RequestContentComponent', () => {
  let component: RequestContentComponent;
  let fixture: ComponentFixture<RequestContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestContentComponent]
    });
    fixture = TestBed.createComponent(RequestContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
