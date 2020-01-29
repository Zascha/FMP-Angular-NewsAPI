import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderTitleService } from '../../shared/HeaderTitleService';
import { NewsStateService } from 'src/app/services/news-state.service';
import { News } from 'src/app/interfaces/news';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.less']
})
export class ArticlePageComponent implements OnInit {
  news: News;

  constructor(
    private headerTitleService: HeaderTitleService,
    private newsStateService: NewsStateService,
    private router: ActivatedRoute) { }

  ngOnInit() {
    this.headerTitleService.setTitle('Read More');

    const newsId = this.router.snapshot.params.id;
    this.news = this.newsStateService.getFromState(newsId);
  }
}
