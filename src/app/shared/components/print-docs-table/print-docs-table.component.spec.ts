import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDocsTableComponent } from './print-docs-table.component';

describe('PrintDocsTableComponent', () => {
  let component: PrintDocsTableComponent;
  let fixture: ComponentFixture<PrintDocsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintDocsTableComponent]
    });
    fixture = TestBed.createComponent(PrintDocsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
