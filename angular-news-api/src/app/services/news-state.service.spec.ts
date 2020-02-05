import { TestBed } from '@angular/core/testing';

import { NewsStateService } from './news-state.service';
import { News } from '../interfaces/news';

describe('NewsStateService', () => {
  let newsStateService: NewsStateService;
  const newsId = '1';
  const news: News = {
    id: newsId,
    source: null,
    author: 'author',
    title: 'title A',
    description: 'description A',
    url: 'url',
    urlToImage: 'url',
    publishedAt: 'date',
    content: 'content A'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [NewsStateService] });
    newsStateService = TestBed.get(NewsStateService);
  });

  it('NewsStateService: should be created', () => {
    expect(newsStateService).toBeTruthy();
  });

  it('NewsStateService.pushToState(): should add passed new to the state. ' +
     'NewsStateService.getFromState(): should return added news', () => {
      const expectedNews = news;
      newsStateService.pushToState(news);
      const actualNews = newsStateService.getFromState(newsId);

      expect(actualNews).toEqual(expectedNews);
    });

  it('NewsStateService.getFromState(): should return "null" an application start', () => {
    const actualNews = newsStateService.getFromState('some id');

    expect(actualNews).toEqual(null);
  });

  it('NewsStateService.getFromState(): should return "null" when requesting not added news', () => {
    newsStateService.pushToState(news);
    const actualNews = newsStateService.getFromState('not added id');

    expect(actualNews).toEqual(null);
  });

  it('NewsStateService.getFromState(): should return "null" when requesting not added news', () => {
    newsStateService.pushToState(news);
    const actualNews = newsStateService.getFromState(newsId);

    expect(actualNews).toEqual(news);
  });
});
