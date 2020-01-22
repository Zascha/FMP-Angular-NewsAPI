import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderTitleService } from '../../shared/HeaderTitleService';
import { LocalNewsService } from 'src/app/services/local-news.service';
import { News } from 'src/app/interfaces/news';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.less']
})
export class EditPageComponent implements OnInit {
  news: News;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private headerTitleService: HeaderTitleService,
    private userService: UserService,
    private localNewsService: LocalNewsService) {
  }

  ngOnInit() {
    this.headerTitleService.setTitle('Edit Page');

    var newsId = this.route.snapshot.paramMap.get('id');
    this.news = !newsId ? new News()
                : this.localNewsService.getLocalNewsById(this.userService.getCurrentUserId().toString(), newsId);

    if (this.news == null) {
      this.router.navigate(['/404']);
    }
  }
}
