import { TestBed } from '@angular/core/testing';

import { BetterLoggerService } from './better-logger.service';

describe('BetterLoggerService', () => {
  let service: BetterLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetterLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
