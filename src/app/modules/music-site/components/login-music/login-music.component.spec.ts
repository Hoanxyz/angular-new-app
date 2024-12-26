import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMusicComponent } from './login-music.component';

describe('LoginMusicComponent', () => {
  let component: LoginMusicComponent;
  let fixture: ComponentFixture<LoginMusicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginMusicComponent]
    });
    fixture = TestBed.createComponent(LoginMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
