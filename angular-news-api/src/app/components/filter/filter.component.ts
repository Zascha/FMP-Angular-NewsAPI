import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';

import { HeaderTitleService } from '../../shared/HeaderTitleService';
import { SearchParamsService } from '../../services/search-params.service';

import { SearchParams } from '../../interfaces/search-params';
import { NewsSource } from '../../interfaces/news-source';
import { NewsSourceProviderService } from 'src/app/services/news-source-provider.service';
import { UserService } from 'src/app/services/user.service';
import { Constants } from 'src/app/constans';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.less']
})
export class FilterComponent implements OnInit {
  filterForm = new FormGroup({
    filterValue: new FormControl(''),
    filterSources: new FormControl('abc-news'),
    filterAuthored: new FormControl(false)
  });

  newsSources: NewsSource[];

  constructor(
    private headerTitleService: HeaderTitleService,
    private newsSourceProviderService: NewsSourceProviderService,
    private searchParamsService: SearchParamsService,
    private userService: UserService,
    private constants: Constants) {
  }

  ngOnInit() {
    this.headerTitleService.setTitle('Live News Column');
    this.newsSourceProviderService.getNewsSources().subscribe(data => this.newsSources = data);

    this.notifySearchParamsHaveChanged();
  }

  isAuthoredChecked() {
    return this.filterForm.value.filterAuthored as boolean;
  }

  canFilterByAuthored() {
    return this.userService.isAnyUserAuthorized();
  }

  notifySearchParamsHaveChanged() {
    const fiterValues = this.filterForm.value;
    const searchParams: SearchParams = {
      source: fiterValues.filterSources,
      searchValue: fiterValues.filterValue,
      authored: fiterValues.filterAuthored,
      perPage: this.constants.DefaultPerPageItemsNumber,
      page: 1
    };
    this.searchParamsService.setNewsSearhParams(searchParams);
  }
}
