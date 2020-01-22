import { TestBed } from '@angular/core/testing';

import { LocalNewsService } from './local-news.service';

describe('LocalNewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalNewsService = TestBed.get(LocalNewsService);
    expect(service).toBeTruthy();
  });
});
