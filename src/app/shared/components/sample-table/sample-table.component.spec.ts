import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleTableComponent } from './sample-table.component';

describe('SampleTableComponent', () => {
  let component: SampleTableComponent;
  let fixture: ComponentFixture<SampleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SampleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
