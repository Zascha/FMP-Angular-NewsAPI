import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from '../../shared/HeaderTitleService';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.less']
})
export class ArticlePageComponent implements OnInit {

  constructor(private headerTitleService: HeaderTitleService) { }

  ngOnInit() {
    this.headerTitleService.setTitle('Article Page');
  }

}
