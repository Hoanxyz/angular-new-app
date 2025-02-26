import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHeroesComponent } from './manage-heroes.component';

describe('ManageHeroesComponent', () => {
  let component: ManageHeroesComponent;
  let fixture: ComponentFixture<ManageHeroesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageHeroesComponent]
    });
    fixture = TestBed.createComponent(ManageHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
