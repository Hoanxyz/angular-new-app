import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSongsComponent } from './list-songs.component';

describe('ListSongsComponent', () => {
  let component: ListSongsComponent;
  let fixture: ComponentFixture<ListSongsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSongsComponent]
    });
    fixture = TestBed.createComponent(ListSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
