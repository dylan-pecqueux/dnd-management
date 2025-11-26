import { TestBed } from '@angular/core/testing';

import { AdventurerService } from './adventurer.service';

describe('AdventurerService', () => {
  let service: AdventurerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdventurerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
