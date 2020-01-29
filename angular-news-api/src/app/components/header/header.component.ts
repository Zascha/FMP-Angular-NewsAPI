import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from '../../shared/HeaderTitleService';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  pageTitle: string;

  constructor(
    private headerTitleService: HeaderTitleService,
    private userService: UserService) { }

  ngOnInit() {
    this.headerTitleService.title.subscribe(updatedTitle => {
      this.pageTitle = updatedTitle;
    });
  }

  isUserAuthorized() {
    return this.userService.isAnyUserAuthorized();
  }

  logInOrOut() {
    if (!this.userService.isAnyUserAuthorized()) {
      this.userService.logIn();
    } else {
      this.userService.logOut();
    }
  }

  getlogInOrOutText() {
    return this.userService.isAnyUserAuthorized() ? 'Log out' : 'Log in';
  }

  getCurrentUserFullName() {
    return this.userService.isAnyUserAuthorized() ? this.userService.getCurrentUserFullName() : '';
  }
}
