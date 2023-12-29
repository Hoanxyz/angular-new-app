import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleContainerComponent } from './example-container.component';

describe('ExampleContainerComponent', () => {
  let component: ExampleContainerComponent;
  let fixture: ComponentFixture<ExampleContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleContainerComponent]
    });
    fixture = TestBed.createComponent(ExampleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
