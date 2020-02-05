import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { Constants } from '../constans';

describe('UserService', () => {
  let constants: Constants;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UserService, Constants]});
    userService = TestBed.get(UserService);
    constants = TestBed.get(Constants);
  });

  it('UserService: should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('UserService.isAnyUserAuthorized(): should return "false" on application start', () => {
    const actualIsAnyUserAuthorized = userService.isAnyUserAuthorized();
    const expectedIsAnyUserAuthorized = false;

    expect(actualIsAnyUserAuthorized).toEqual(expectedIsAnyUserAuthorized);
  });

  it('UserService.isAnyUserAuthorized(): should return "true" if any user logged in', () => {
    userService.logIn();
    const actualIsAnyUserAuthorized = userService.isAnyUserAuthorized();
    const expectedIsAnyUserAuthorized = true;

    expect(actualIsAnyUserAuthorized).toEqual(expectedIsAnyUserAuthorized);
  });

  it('UserService.isAnyUserAuthorized(): should return "false" when a user logges out', () => {
    userService.logIn();
    const actualIsAnyUserAuthorizedBeforeLoggingOut = userService.isAnyUserAuthorized();
    const expectedIsAnyUserAuthorizedBeforeLoggingOut = true;

    userService.logOut();
    const actualIsAnyUserAuthorizedAfterLoggingOut = userService.isAnyUserAuthorized();
    const expectedIsAnyUserAuthorizedAfterLoggingOut = false;

    expect(actualIsAnyUserAuthorizedBeforeLoggingOut).toEqual(expectedIsAnyUserAuthorizedBeforeLoggingOut);
    expect(actualIsAnyUserAuthorizedAfterLoggingOut).toEqual(expectedIsAnyUserAuthorizedAfterLoggingOut);
  });

  it('UserService.getCurrentUserId(): should return "NotAuthorizedUserId"(-1) on application start', () => {
    const expectedNotAuthorizedUserId = constants.NotAuthorizedUserId;
    const actualNotAuthorizedUserId = userService.getCurrentUserId();

    expect(actualNotAuthorizedUserId).toEqual(expectedNotAuthorizedUserId);
  });

  it('UserService.getCurrentUserId(): should return a user id if any is logged in', () => {
    userService.logIn();
    const actualAuthorizedUserId = userService.getCurrentUserId();
    const expectedAuthorizedUserId = constants.DefaultAuthorizedUserId;

    expect(actualAuthorizedUserId).toEqual(expectedAuthorizedUserId);
  });

  it('UserService.getCurrentUserId(): should return "NotAuthorizedUserId"(-1) when a user logges out', () => {
    userService.logIn();
    const actualAuthorizedUserIdBeforeLoggingOut = userService.getCurrentUserId();
    const expectedAuthorizedUserIdBeforeLoggingOut = constants.DefaultAuthorizedUserId;

    userService.logOut();
    const actualAuthorizedUserIdAfterLoggingOut = userService.getCurrentUserId();
    const expectedAuthorizedUserIdAfterLoggingOut = constants.NotAuthorizedUserId;

    expect(actualAuthorizedUserIdBeforeLoggingOut).toEqual(expectedAuthorizedUserIdBeforeLoggingOut);
    expect(actualAuthorizedUserIdAfterLoggingOut).toEqual(expectedAuthorizedUserIdAfterLoggingOut);
  });

  it('UserService.getCurrentUserFullName(): should return "null" on application start', () => {
    const actualCurrentUserFullName = userService.getCurrentUserFullName();
    const expectedCurrentUserFullName = null;

    expect(actualCurrentUserFullName).toEqual(expectedCurrentUserFullName);
  });

  it('UserService.getCurrentUserFullName(): should return the current user name if logged in', () => {
    userService.logIn();
    const actualCurrentUserFullName = userService.getCurrentUserFullName();
    const expectedCurrentUserFullName = constants.DefaultAuthoredUserFullName;

    expect(actualCurrentUserFullName).toEqual(expectedCurrentUserFullName);
  });

  it('UserService.getCurrentUserFullName(): should return "null" when a user logges out', () => {
    userService.logIn();
    const actualCurrentUserFullNameBeforeLoggingOut = userService.getCurrentUserFullName();
    const expectedCurrentUserFullNameBeforeLoggingOut = constants.DefaultAuthoredUserFullName;

    userService.logOut();
    const actualCurrentUserFullNameAfterLoggingOut = userService.getCurrentUserFullName();
    const expectedCurrentUserFullNameAfterLoggingOut = null;

    expect(actualCurrentUserFullNameBeforeLoggingOut).toEqual(expectedCurrentUserFullNameBeforeLoggingOut);
    expect(actualCurrentUserFullNameAfterLoggingOut).toEqual(expectedCurrentUserFullNameAfterLoggingOut);
  });
});
