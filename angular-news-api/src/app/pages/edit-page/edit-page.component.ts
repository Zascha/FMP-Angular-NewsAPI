import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HeaderTitleService } from '../../shared/HeaderTitleService';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { News } from 'src/app/interfaces/news';
import { NewsSource } from 'src/app/interfaces/news-source';
import { LocalNewsService } from 'src/app/services/local-news.service';
import { NewsStateService } from 'src/app/services/news-state.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageComponent implements OnInit {
  news: News;
  submitted: boolean;
  uploadNewsImageFromLocal: boolean;
  newsImageUrl: any;
  newsEditForm = new FormGroup({
    newsTitle: new FormControl('', Validators.required),
    newsDescription: new FormControl(''),
    newsContent: new FormControl('', Validators.required),
    newsUrl: new FormControl('', Validators.pattern('(https?:\/\/)([a-zA-Z0-9\.\-\_]+\/?)+')),
    newsImgUrl: new FormControl(''),
    newsSourceUrl: new FormControl('', Validators.pattern('(https?:\/\/)([a-zA-Z0-9\.\-\_]+\/?)+'))
  });

  get runChangeDetection() {
    return true;
  }

  constructor(
    private headerTitleService: HeaderTitleService,
    private localNewsService: LocalNewsService,
    private newsStateService: NewsStateService,
    private userService: UserService,
    private router: ActivatedRoute) {
    this.uploadNewsImageFromLocal = false;
    this.submitted = false;
  }

  ngOnInit() {
    this.headerTitleService.setTitle('Edit Page');

    const newsId = this.router.snapshot.params.id;
    this.news = this.newsStateService.getFromState(newsId);

    if (this.news) {
      this.newsEditForm.controls.newsTitle.setValue(this.news.title);
      this.newsEditForm.controls.newsDescription.setValue(this.news.description);
      this.newsEditForm.controls.newsContent.setValue(this.news.content);
      this.newsEditForm.controls.newsUrl.setValue(this.news.url);
      this.newsEditForm.controls.newsImgUrl.setValue(this.news.urlToImage);
      this.newsEditForm.controls.newsSourceUrl.setValue(this.news.source.name);
    } else {
      this.news = new News();
    }
  }

  saveNews() {
    this.submitted = true;

    const newsSourse: NewsSource = {
      id: this.newsEditForm.value.newsSourceUrl,
      name: this.newsEditForm.value.newsSourceUrl
    };

    this.news.title = this.newsEditForm.value.newsTitle;
    this.news.description = this.newsEditForm.value.newsDescription;
    this.news.content = this.newsEditForm.value.newsContent;
    this.news.url = this.newsEditForm.value.newsUrl;
    this.news.urlToImage = this.newsEditForm.value.newsImgUrl;
    this.news.source = newsSourse;

    if (this.userService.isAnyUserAuthorized()) {
      if (this.news.id) {
        this.localNewsService.updateLocalNews(this.news);
        alert('Saved');
      } else {
        this.localNewsService.createLocalNews(this.news);
        alert('Created');
      }
    }
  }

  resetNews() {
    this.submitted = false;
    this.newsEditForm.reset();
  }

  invertUploadNewsImageFromLocal() {
    this.uploadNewsImageFromLocal = !this.uploadNewsImageFromLocal;
  }

  showUploadedImagePreview(fileInput: any) {
    debugger;
    if (!fileInput || !fileInput.target || fileInput.target.files.length === 0) {
      return;
    }
    const fileData = fileInput.target.files[0] as File;
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = () => {
      this.newsImageUrl = reader.result;
    };
  }
}
