import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSelectCompComponent } from './new-select-comp.component';

describe('NewSelectCompComponent', () => {
  let component: NewSelectCompComponent;
  let fixture: ComponentFixture<NewSelectCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSelectCompComponent]
    });
    fixture = TestBed.createComponent(NewSelectCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
