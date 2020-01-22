import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { News } from '../../interfaces/news';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.less']
})
export class NewsCardComponent implements OnInit {
  @Input() news: News;
  @Output() deleteNewsEventEmitter = new EventEmitter<string>();

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  isAuthoredNews(){
    return this.news.author == this.userService.getCurrentUserId().toString();
  }

  deleteNews(){
    debugger;
    console.log("Deleting news on click");
    this.deleteNewsEventEmitter.emit(this.news.id);
  }
}
