import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { News } from '../../interfaces/news';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NewsStateService } from 'src/app/services/news-state.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.less']
})
export class NewsCardComponent implements OnInit {
  @Input() news: News;
  @Output() deleteNewsEventEmitter = new EventEmitter<string>();

  constructor(
    public viewContainerRef: ViewContainerRef,
    private userService: UserService,
    private newsStateService: NewsStateService,
    private router: Router) { }

  ngOnInit() { }

  isAuthoredNews() {
    return parseInt(this.news.author) === this.userService.getCurrentUserId();
  }

  deleteNews() {
    this.deleteNewsEventEmitter.emit(this.news.id);
  }

  redirectToNewsViewPage() {
    this.newsStateService.pushToState(this.news);
    this.router.navigate(['/view/' + this.news.id]);
  }

  redirectToNewsEditPage() {
    this.newsStateService.pushToState(this.news);
    this.router.navigate(['/edit/' + this.news.id]);
  }
}
