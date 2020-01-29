import { Injectable } from '@angular/core';
import { News } from '../interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class NewsStateService {
  news: News[];

  constructor() {
    this.news = [];
   }

   pushToState(news: News){
    this.news.push(news);
   }

   getFromState(newsId: string){
    const newsToGet = this.news.filter(news => news.id === newsId);
    return newsToGet.length > 0 ? newsToGet[0] : null;
   }
}
