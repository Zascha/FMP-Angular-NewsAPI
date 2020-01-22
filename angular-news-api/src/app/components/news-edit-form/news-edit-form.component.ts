import { Component, OnInit, Input } from '@angular/core';
import { News } from 'src/app/interfaces/news';
import { FormGroup, FormControl } from '@angular/forms';
import { LocalNewsService } from 'src/app/services/local-news.service';

@Component({
  selector: 'app-news-edit-form',
  templateUrl: './news-edit-form.component.html',
  styleUrls: ['./news-edit-form.component.less']
})
export class NewsEditFormComponent implements OnInit {
  @Input() news: News;
  newsEditForm = new FormGroup({
    newsTitle: new FormControl('', ),
    newsDescription: new FormControl(''),
    newsUrl: new FormControl(''),
    newsContent: new FormControl(''),
  });

  constructor(private localNewsService: LocalNewsService) { }

  ngOnInit() {
  }

  save(){
    if(this.news.id){
      this.localNewsService.updateLocalNews(this.news);
    }
    else{
      this.localNewsService.createLocalNews(this.news);
    }
  }
}
