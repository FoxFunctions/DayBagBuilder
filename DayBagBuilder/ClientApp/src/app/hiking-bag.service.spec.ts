import { TestBed } from '@angular/core/testing';

import { HikingBagService } from './hiking-bag.service';

describe('HikingBagService', () => {
  let service: HikingBagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HikingBagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
