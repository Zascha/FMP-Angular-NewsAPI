import { TestBed } from '@angular/core/testing';

import { LocalNewsService } from './local-news.service';
import { News } from '../interfaces/news';
import { SearchParams } from '../interfaces/search-params';
import { UserService } from './user.service';
import { Constants } from '../constans';

describe('LocalNewsService', () => {
  let localNewsService: LocalNewsService;
  const news: News = {
    id: '',
    source: null,
    author: '-1',
    title: 'title A',
    description: 'description A',
    url: 'url',
    urlToImage: 'url',
    publishedAt: 'date',
    content: 'content A'
  };
  const searchParams: SearchParams = {
    source: '',
    searchValue: '',
    authored: true,
    page: 1,
    perPage: 10
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalNewsService, UserService, Constants]
    });
    localNewsService = TestBed.get(LocalNewsService);
  });

  it('LocalNewsService: should be created', () => {
    expect(localNewsService).toBeTruthy();
  });

  it('LocalNewsService.createLocalNews(): adds passed news to a local news storage. ' +
    'LocalNewsService.getLocalNewsById():', () => {
      const authorId = '-1';
      news.author = authorId;

      const createdNews = localNewsService.createLocalNews(news);
      const actualAddedNews = localNewsService.getLocalNewsById(authorId, createdNews.id);

      expect(createdNews.title).toEqual(news.title);
      expect(actualAddedNews.title).toEqual(news.title);
      expect(createdNews).toEqual(actualAddedNews);
    });

  it('LocalNewsService.updateLocalNews(): updates passed news to a local news storage', () => {
    const authorId = '-1';
    const updatedTitle = 'updated';
    news.author = authorId;

    const createdNews = localNewsService.createLocalNews(news);
    createdNews.title = updatedTitle;
    localNewsService.updateLocalNews(createdNews);
    const actualUpdatedNews = localNewsService.getLocalNewsById(authorId, createdNews.id);

    expect(createdNews.title).toEqual(news.title);
    expect(actualUpdatedNews.title).toEqual(updatedTitle);
  });

  it('LocalNewsService.deleteLocalNews(): deletes the news with passed id from a local news storage', () => {
    const authorId = '-1';
    news.author = authorId;

    const createdNews = localNewsService.createLocalNews(news);
    localNewsService.deleteLocalNews(createdNews.id);
    const actualUpdatedNews = localNewsService.getLocalNewsById(authorId, createdNews.id);

    expect(createdNews.title).toEqual(news.title);
    expect(actualUpdatedNews).toEqual(null);
  });

  it('LocalNewsService.getLocalNewsByUserId(): returns the list of news created by the passed user (id) from a local news storage', () => {
    const authorId = '-1';
    news.author = authorId;

    const createdNews = localNewsService.createLocalNews(news);
    const actualNewsList = localNewsService.getLocalNewsByUserId(authorId, searchParams);

    expect(actualNewsList.total).toBe(1);
    expect(actualNewsList.news.length).toBe(1);
    expect(actualNewsList.news[0]).toEqual(news);
  });
});
