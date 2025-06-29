import { TestBed } from '@angular/core/testing';

import { MockPeriodicElements } from './mock-periodic-elements';

describe('MockPeriodicElements', () => {
  let service: MockPeriodicElements;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockPeriodicElements);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
