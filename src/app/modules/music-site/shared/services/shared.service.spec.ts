import { TestBed } from '@angular/core/testing';

import { MusicSharedService } from './music-shared.service';

describe('SharedService', () => {
  let service: MusicSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
