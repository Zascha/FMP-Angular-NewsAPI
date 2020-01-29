import { TestBed } from '@angular/core/testing';

import { NewsStateService } from './news-state.service';

describe('NewsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsStateService = TestBed.get(NewsStateService);
    expect(service).toBeTruthy();
  });
});
