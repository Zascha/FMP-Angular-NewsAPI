import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsSource } from '../interfaces/news-source';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsSourceProviderService {
  sources: NewsSource[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getNewsSources(): Observable<NewsSource[]> {
    const baseUrl = 'https://newsapi.org/v2/sources?apiKey=43ac62ab67ae45be8a8d60a659fc296f';

    return this.httpClient.get(baseUrl)
      .pipe(
        map((response: Response) => {
          const newsList = (response as any).sources;
          return newsList.map((item: any) => {
            return {
              id: item.id,
              name: item.name
            };
          });
        }));
  }
}
