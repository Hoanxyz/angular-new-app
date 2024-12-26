import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicUserInfoComponent } from './music-user-info.component';

describe('MusicUserInfoComponent', () => {
  let component: MusicUserInfoComponent;
  let fixture: ComponentFixture<MusicUserInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicUserInfoComponent]
    });
    fixture = TestBed.createComponent(MusicUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
