import { Component, OnInit } from '@angular/core';
import { News } from '../../interfaces/news';
import { NewsService } from 'src/app/services/news.service';
import { NewsResponse } from 'src/app/interfaces/news-response';
import { SearchParams } from 'src/app/interfaces/search-params';
import { SearchParamsService } from 'src/app/services/search-params.service';
import { Subscription } from 'rxjs';
import { LocalNewsService } from 'src/app/services/local-news.service';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { UserService } from 'src/app/services/user.service';

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadNews(searchParams: SearchParams) {    
    console.log(searchParams);
    searchParams.page = this.currentPage++;
    this.newsData = searchParams.authored
    ? this.localNewsService.getLocalNewsByUserId(this.userService.getCurrentUserId().toString(), searchParams)
    : this.newsService.getNewsList(searchParams);
  }

  loadMoreNews(){
    this.loadNews(this.currentSearchParams);
  }

  canLoadMoreNews() {
    return this.newsData && this.newsData.news && this.newsData.news.length != this.newsData.total;
  }

  hasNewsToShow(){
    return this.newsData && this.newsData.news && this.newsData.news.length > 0;
  }

  deleteNews($event){
    debugger;
    console.log("Parent delete", $event);
  }
}
