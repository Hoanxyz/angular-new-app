import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicUserCollectionsComponent } from './music-user-collections.component';

describe('MusicUserCollectionsComponent', () => {
  let component: MusicUserCollectionsComponent;
  let fixture: ComponentFixture<MusicUserCollectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicUserCollectionsComponent]
    });
    fixture = TestBed.createComponent(MusicUserCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
