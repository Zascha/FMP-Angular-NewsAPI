import { TestBed } from '@angular/core/testing';

import { NewsSourceProviderService } from './news-source-provider.service';

describe('NewsSourceProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsSourceProviderService = TestBed.get(NewsSourceProviderService);
    expect(service).toBeTruthy();
  });
});
