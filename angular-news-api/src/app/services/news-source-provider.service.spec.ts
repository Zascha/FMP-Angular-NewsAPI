import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { NewsSourceProviderService } from './news-source-provider.service';
import { NewsSource } from '../interfaces/news-source';

describe('NewsSourceProviderService', () => {
  let httpMock: HttpTestingController;
  let newsSourceProviderService: NewsSourceProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsSourceProviderService]
    });
    newsSourceProviderService = TestBed.get(NewsSourceProviderService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('NewsSourceProviderService: should be created', () => {
    expect(newsSourceProviderService).toBeTruthy();
  });

  it('NewsSourceProviderService.getNewsSources(): should return the list of sources', () => {
    const expectedNewsSources: NewsSource[] = [
      { id: '1', name: 'source A' },
      { id: '2', name: 'source B' }
    ];

    newsSourceProviderService.getNewsSources().subscribe(data =>
      expect(data).toEqual(expectedNewsSources)
    );

    const req = httpMock.expectOne('https://newsapi.org/v2/sources?apiKey=43ac62ab67ae45be8a8d60a659fc296f');
    expect(req.request.method).toBe('GET');
    req.flush(expectedNewsSources);
    httpMock.verify();
  });
});
