import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsSource } from '../interfaces/news-source';

@Injectable({
  providedIn: 'root'
})
export class NewsSourceProviderService {
  sources: NewsSource[];

  constructor(private httpClient: HttpClient) {
    this.sources = [];
    this.initNewsSources();
  }

  getNewsSources() {
    return this.sources;
  }

  private initNewsSources() {
    const baseUrl = 'https://newsapi.org/v2/sources?apiKey=43ac62ab67ae45be8a8d60a659fc296f';

    this.httpClient.get(baseUrl).subscribe((response: Response) => {
      for (const item of (response as any).sources) {
        const newsSourse: NewsSource = {
          id: item.id,
          name: item.name
        };
        this.sources.push(newsSourse);
      }
    });
  }
}
