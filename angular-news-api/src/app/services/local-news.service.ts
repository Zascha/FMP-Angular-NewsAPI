import { Injectable } from '@angular/core';
import { News } from '../interfaces/news';
import { Constants } from '../constans';
import { SearchParams } from '../interfaces/search-params';
import { NewsResponse } from '../interfaces/news-response';

import { v4 as uuid } from 'uuid';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LocalNewsService {
  private localNewsStorage: News[] = [];

  constructor(
    private constants: Constants,
    private userService: UserService) { }

  getLocalNewsById(userId: string, newsId: string) {
    const news = this.localNewsStorage.filter(x => x.id = newsId);

    if (!news || news.length === 0 || news[0].author !== userId) {
      return null;
    }

    return news[0];
  }

  getLocalNewsByUserId(userId: string, searchParams: SearchParams) {
    const newsResponse: NewsResponse = new NewsResponse();
    const skipNewsNumber = (searchParams.page - 1) * searchParams.perPage;

    newsResponse.total = this.localNewsStorage.length;
    newsResponse.news = this.localNewsStorage
      .filter(x => {
        return x.author === userId &&
          ((x.title.includes(searchParams.searchValue)
            || x.description.includes(searchParams.searchValue))
          );
      })
      .slice(skipNewsNumber, skipNewsNumber + searchParams.perPage);

    return newsResponse;
  }

  createLocalNews(news: News) {
    news.id = uuid();
    news.author = this.userService.getCurrentUserId().toString();
    news.publishedAt = this.getNowDateTime();
    this.localNewsStorage.push(news);
  }

  updateLocalNews(news: News) {
    const newsIndex = this.localNewsStorage.findIndex((x => x.id === news.id));
    this.localNewsStorage[newsIndex] = news;
  }

  deleteLocalNews(newsId: string) {
    this.localNewsStorage = this.localNewsStorage.filter(x => x.id === newsId);
  }

  private getNowDateTime() {
    const currentdate = new Date();
    return currentdate.getFullYear() + '-' +
      (currentdate.getMonth() + 1) + '-' +
      currentdate.getDate() + 'T' +
      currentdate.getHours() + ':' +
      currentdate.getMinutes() + ':' +
      currentdate.getSeconds() + 'Z';
  }
}
