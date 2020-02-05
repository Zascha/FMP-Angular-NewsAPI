import { TestBed } from '@angular/core/testing';
import { SearchParamsService } from './search-params.service';
import { SearchParams } from '../interfaces/search-params';

describe('SearchParamsService', () => {
  let searchParamsService: SearchParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SearchParamsService]});
    searchParamsService = TestBed.get(SearchParamsService);
  });

  it('SearchParamsService: should be created', () => {
    expect(searchParamsService).toBeTruthy();
  });

  it('SearchParamsService.setNewsSearhParams(): set passed search params', () => {
    const expectedSearchParams: SearchParams = {
      authored: false,
      source: 'abc-news',
      searchValue: 'searchValue',
      page: 1,
      perPage: 10
    };
    searchParamsService.setNewsSearhParams(expectedSearchParams);
    searchParamsService.getUpdatedNewsSearchParams().subscribe(actualSearchParams => {
      expect(actualSearchParams as SearchParams).toEqual(expectedSearchParams);
    });
  });
});
