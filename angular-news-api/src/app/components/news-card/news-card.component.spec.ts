import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCardComponent } from './news-card.component';
import { Constants } from 'src/app/constans';
import { ViewContainerRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NewsStateService } from 'src/app/services/news-state.service';
import { Router } from '@angular/router';
import { CharsCountPipe } from 'src/app/pipes/chars-count.pipe';
import { News } from 'src/app/interfaces/news';

describe('NewsCardComponent', () => {
  let component: NewsCardComponent;
  let fixture: ComponentFixture<NewsCardComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', ['getCurrentUserId']);
  const mockNewsStateService = jasmine.createSpyObj('NewsStateService', ['pushToState']);
  const mockRouter = { navigate: jasmine.createSpy('navigate')};

  const news: News = {
    id: '1',
    source: { id: 'A', name: 'Source A'},
    author: '1',
    title: 'title A',
    description: 'description A',
    url: 'url',
    urlToImage: 'url',
    publishedAt: 'date',
    content: 'content A'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsCardComponent, CharsCountPipe ],
      providers: [
        ViewContainerRef,
        { provide: UserService, useValue: mockUserService },
        { provide: NewsStateService, useValue: mockNewsStateService },
        { provide: Router, useValue: mockRouter },
        Constants]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCardComponent);
    component = fixture.debugElement.componentInstance;
    component.news = news;
    fixture.detectChanges();
  });

  it('NewsCardComponent: should create and have @input news', () => {
     expect(component).toBeTruthy();
  });

  it('NewsCardComponent.isAuthoredNews(): should return "true" is passed news has the same userId as logged in user', () => {
    const loggedUserId = 1;
    mockUserService.getCurrentUserId.and.returnValue(loggedUserId);
    component.news.author = loggedUserId.toString();

    const isAuthored = component.isAuthoredNews();

    expect(isAuthored).toBe(true);
  });

  it('NewsCardComponent.isAuthoredNews(): should return "false" is passed news has different userId from logged in user', () => {
    const loggedUserId = 'some id';
    mockUserService.getCurrentUserId.and.returnValue(loggedUserId);

    const isAuthored = component.isAuthoredNews();

    expect(isAuthored).toBe(false);
  });

  it('NewsCardComponent.redirectToNewsEditPage(): should put the current news to NewsSatte and redirect to edit page', () => {
    component.redirectToNewsEditPage();

    expect(mockNewsStateService.pushToState).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('NewsCardComponent.redirectToNewsViewPage(): should put the current news to NewsSatte and redirect to view page', () => {
    component.redirectToNewsViewPage();

    expect(mockNewsStateService.pushToState).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
