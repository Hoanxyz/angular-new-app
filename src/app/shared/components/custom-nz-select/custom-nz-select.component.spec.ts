import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomNzSelectComponent } from './custom-nz-select.component';

describe('CustomNzSelectComponent', () => {
  let component: CustomNzSelectComponent;
  let fixture: ComponentFixture<CustomNzSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomNzSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomNzSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
