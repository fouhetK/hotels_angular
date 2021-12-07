import { TestBed } from '@angular/core/testing';

import { ResasGuard } from './resas.guard';

describe('ResasGuard', () => {
  let guard: ResasGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ResasGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
