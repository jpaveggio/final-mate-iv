import { TestBed } from '@angular/core/testing';

import { BisectionService } from './bisection.service';

describe('BisectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BisectionService = TestBed.get(BisectionService);
    expect(service).toBeTruthy();
  });
});
