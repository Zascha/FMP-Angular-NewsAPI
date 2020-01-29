import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SearchParams } from '../interfaces/search-params';
import { News } from '../interfaces/news';
import { NewsSource } from '../interfaces/news-source';
import { NewsResponse } from '../interfaces/news-response';

import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient) { }

  getNewsList(searchParams: SearchParams) {
    const newsResponse = new NewsResponse();
    this.httpClient.get(this.formRequestUrl(searchParams))
      .subscribe(data => {
        newsResponse.total = parseInt((data as any).totalResults);
        newsResponse.news = this.getResponseArticles((data as any).articles);
      });

    return newsResponse;
  }

  private formRequestUrl(searchParams: SearchParams) {
    let baseUrl = 'https://newsapi.org/v2/everything?apiKey=43ac62ab67ae45be8a8d60a659fc296f';

    baseUrl = this.getUrlWithNewRequestUrlParam(baseUrl, 'pageSize', String(searchParams.page * searchParams.perPage));
    baseUrl = this.getUrlWithNewRequestUrlParam(baseUrl, 'q', searchParams.searchValue);
    baseUrl = this.getUrlWithNewRequestUrlParam(baseUrl, 'sources', searchParams.source);

    return baseUrl;
  }

  private getUrlWithNewRequestUrlParam(urlString: string, urlParam: string, urlParamValue: string) {
    if (urlParamValue) {
      urlString += '&' + urlParam + '=' + urlParamValue;
    }
    return urlString;
  }

  private getResponseArticles(data: any) {
    const news = [] as News[];

    for (const item of data) {
      const newsSourse: NewsSource = {
        id: item.source.id,
        name: item.source.name
      };

      const newsItem: News = {
        id: uuid(),
        source: newsSourse,
        author: item.author,
        title: item.title,
        description: item.description,
        url: item.url,
        urlToImage: item.urlToImage !== 'null' ? item.urlToImage : 'assets/news-default-image.jpg',
        publishedAt: item.publishedAt,
        content: item.content
      };
      news.push(newsItem);
    }

    return news as News[];
  }
}
