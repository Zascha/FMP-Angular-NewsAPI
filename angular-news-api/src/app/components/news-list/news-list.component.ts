import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { NewsResponse } from 'src/app/interfaces/news-response';
import { SearchParams } from 'src/app/interfaces/search-params';
import { SearchParamsService } from 'src/app/services/search-params.service';
import { Subscription } from 'rxjs';
import { LocalNewsService } from 'src/app/services/local-news.service';
import { UserService } from 'src/app/services/user.service';
import { NewsCardComponent } from '../news-card/news-card.component';
import { News } from 'src/app/interfaces/news';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.less']
})
export class NewsListComponent implements OnInit {
  subscription: Subscription;
  newsData: NewsResponse;
  currentSearchParams: SearchParams;
  currentPage: number;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private newsService: NewsService,
    private localNewsService: LocalNewsService,
    private newsSearchParamsService: SearchParamsService,
    private userService: UserService) {
    this.currentPage = 1;
    this.subscription = this.newsSearchParamsService.getUpdatedNewsSearchParams()
      .subscribe(searchParams => {
        this.currentSearchParams = searchParams as SearchParams;
        this.loadNews(this.currentSearchParams);
      });
  }

  ngOnInit() {

  }

  loadNews(searchParams: SearchParams) {
    this.newsData = searchParams.authored
    ? this.localNewsService.getLocalNewsByUserId(this.userService.getCurrentUserId().toString(), searchParams)
    : this.newsService.getNewsList(searchParams);
  }

  loadMoreNews() {
    this.currentSearchParams.page = ++this.currentPage;
    this.loadNews(this.currentSearchParams);
  }

  canLoadMoreNews() {
    return this.newsData && this.newsData.news && this.newsData.news.length !== this.newsData.total;
  }

  hasNewsToShow() {
    return this.newsData && this.newsData.news && this.newsData.news.length > 0;
  }

  deleteNews($event) {
    this.localNewsService.deleteLocalNews($event);
    this.currentSearchParams.page = 0;
    this.loadMoreNews();
  }
}
