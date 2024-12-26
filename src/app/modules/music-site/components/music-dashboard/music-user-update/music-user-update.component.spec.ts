import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicUserUpdateComponent } from './music-user-update.component';

describe('MusicUserUpdateComponent', () => {
  let component: MusicUserUpdateComponent;
  let fixture: ComponentFixture<MusicUserUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicUserUpdateComponent]
    });
    fixture = TestBed.createComponent(MusicUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
