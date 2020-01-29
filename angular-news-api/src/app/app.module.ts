import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

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
import { UserService } from './services/user.service';
import { LocalNewsService } from './services/local-news.service';
import { CharsCountPipe } from './pipes/chars-count.pipe';
import { CommonModule } from '@angular/common';
import { StandardButtonComponent } from './elements/standard-button/standard-button.component';

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
    CharsCountPipe,
    StandardButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    HeaderTitleService,
    Constants,
    UserService,
    LocalNewsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [StandardButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
  constructor(private injector: Injector) {
    const button = createCustomElement(StandardButtonComponent, { injector });
    customElements.define('app-standard-button', button);
  }
}
