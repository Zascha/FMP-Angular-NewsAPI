import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListComponent } from './news-list.component';
import { Constants } from 'src/app/constans';
import { NewsService } from 'src/app/services/news.service';
import { LocalNewsService } from 'src/app/services/local-news.service';
import { SearchParamsService } from 'src/app/services/search-params.service';
import { UserService } from 'src/app/services/user.service';
import { NewsCardComponent } from '../news-card/news-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NewsListComponent', () => {
  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;

  const mockRouter = { navigate: jasmine.createSpy('navigate')};
  //const mockUserService = jasmine.createSpyObj('UserService', ['isAnyUserAuthorized', 'getCurrentUserFullName', 'logIn', 'logOut']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsListComponent, NewsCardComponent],
      providers: [
        NewsService,
        LocalNewsService,
        SearchParamsService,
        UserService,
        Constants],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
      //{ provide: UserService, useValue: mockUserService }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
