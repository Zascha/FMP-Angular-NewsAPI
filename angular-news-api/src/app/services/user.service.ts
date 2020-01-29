import { Injectable } from '@angular/core';
import { Constants } from '../constans';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserId: number;

  constructor(private constants: Constants) {
    this.currentUserId = this.constants.NotAuthorizedUserId;
  }

  logIn() {
    this.currentUserId = 1;
  }

  logOut() {
    this.currentUserId = this.constants.NotAuthorizedUserId;
  }

  getCurrentUserId() {
    return this.currentUserId;
  }

  getCurrentUserFullName() {
    return this.isAnyUserAuthorized() ? this.constants.DefaultAuthoredUserFullName : null;
  }

  isAnyUserAuthorized() {
    return this.currentUserId !== this.constants.NotAuthorizedUserId;
  }
}
