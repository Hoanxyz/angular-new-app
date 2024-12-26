import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMusicComponent } from './header-music.component';

describe('HeaderMusicComponent', () => {
  let component: HeaderMusicComponent;
  let fixture: ComponentFixture<HeaderMusicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderMusicComponent]
    });
    fixture = TestBed.createComponent(HeaderMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
