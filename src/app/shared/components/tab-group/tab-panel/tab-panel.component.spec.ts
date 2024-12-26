import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPanelComponent } from './tab-panel.component';

describe('TabPanelComponent', () => {
  let component: TabPanelComponent;
  let fixture: ComponentFixture<TabPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabPanelComponent]
    });
    fixture = TestBed.createComponent(TabPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
