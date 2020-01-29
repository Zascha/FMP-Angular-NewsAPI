import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { SearchParams } from '../interfaces/search-params';

@Injectable({
  providedIn: 'root'
})
export class SearchParamsService {
  searchParams: Subject<SearchParams>;

  constructor() {
    this.searchParams = new Subject<SearchParams>();
  }

  setNewsSearhParams(params: SearchParams) {
    this.searchParams.next(params);
  }

  getUpdatedNewsSearchParams(): Observable<any> {
    return this.searchParams.asObservable();
  }
}
