import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

import { HeaderTitleService } from './shared/HeaderTitleService';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { FilterComponent } from './components/filter/filter.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { Constants } from './constans';
import { NewsEditFormComponent } from './components/news-edit-form/news-edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    ArticlePageComponent,
    EditPageComponent,
    NotFoundPageComponent,
    NewsCardComponent,
    FilterComponent,
    NewsListComponent,
    NewsEditFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    HeaderTitleService,
    Constants
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
