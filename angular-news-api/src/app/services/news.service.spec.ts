import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewsService } from './news.service';
import { SearchParams } from '../interfaces/search-params';

describe('NewsService', () => {
  let httpMock: HttpTestingController;
  let newsService: NewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService]
    });
    newsService = TestBed.get(NewsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('NewsService: should be created', () => {
    expect(newsService).toBeTruthy();
  });

  it('NewsService.getNewsList(): should return the list of news according to search params', () => {
    const searchParams: SearchParams = {
      authored: false,
      source: '',
      searchValue: '',
      page: 1,
      perPage: 10
    };
    const fakeNews = [{
      id: '1',
      source: null,
      author: 'author',
      title: 'title A',
      description: 'description A',
      url: 'url',
      urlToImage: 'url',
      publishedAt: 'date',
      content: 'content A'
    }, {
      id: '1',
      source: null,
      author: 'author',
      title: 'title B',
      description: 'description B',
      url: 'url',
      urlToImage: 'url',
      publishedAt: 'date',
      content: 'content B'
    }];

    newsService.getNewsList(searchParams).subscribe(data => {
      expect(data.total).toBe(2);
      expect(data.news.length).toBe(2);
      expect(data.news).toEqual(fakeNews);
    });

    const req = httpMock.expectOne('https://newsapi.org/v2/everything?apiKey=43ac62ab67ae45be8a8d60a659fc296f&pageSize=10');
    expect(req.request.method).toBe('GET');
    req.flush(fakeNews);
  });
});
