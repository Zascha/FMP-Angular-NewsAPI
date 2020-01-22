import { Injectable } from '@angular/core';
import { News } from '../interfaces/news';
import { Constants } from '../constans';
import { SearchParams } from '../interfaces/search-params';
import { NewsResponse } from '../interfaces/news-response';

import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class LocalNewsService {
  private localNewsStorage: News[] = [];

  constructor(private constants: Constants) { }

  getLocalNewsById(userId: string, newsId: string){
    var news = this.localNewsStorage.filter(x => { return x.id = newsId });

    if(!news || news.length == 0 || news[0].author != userId){
      return null;
    }

    return news[0];
  }

  getLocalNewsByUserId(userId: string, searchParams: SearchParams) {
    var newsResponse: NewsResponse = new NewsResponse();

    var skipNewsNumber = (searchParams.page - 1) * searchParams.perPage;

    newsResponse.total = this.localNewsStorage.length;
    newsResponse.news = this.localNewsStorage
      .filter(x => {
        return x.author == userId &&
          (searchParams.searchValue &&
            (x.title.includes(searchParams.searchValue)
              || x.description.includes(searchParams.searchValue))
          )
      })
      .slice(skipNewsNumber, skipNewsNumber + searchParams.perPage);

    return newsResponse;
  }

  createLocalNews(news: News) {
    news.id = uuid();
    this.localNewsStorage.push(news);
  }

  updateLocalNews(news: News) {
    var newsIndex = this.localNewsStorage.findIndex((x => x.id == news.id));
    this.localNewsStorage[newsIndex] = news;
  }

  deleteLocalNews(newsId: string) {
    this.localNewsStorage = this.localNewsStorage.filter(x => { return x.id == newsId });
  }
}
