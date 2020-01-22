import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class HeaderTitleService {
  title = new BehaviorSubject('');

  setTitle(title: string) {
    this.title.next(title);
  }
}