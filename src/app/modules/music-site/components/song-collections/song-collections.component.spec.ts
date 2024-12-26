import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongCollectionsComponent } from './song-collections.component';

describe('SongCollectionsComponent', () => {
  let component: SongCollectionsComponent;
  let fixture: ComponentFixture<SongCollectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SongCollectionsComponent]
    });
    fixture = TestBed.createComponent(SongCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
