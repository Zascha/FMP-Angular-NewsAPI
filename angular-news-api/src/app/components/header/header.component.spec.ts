import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { UserService } from 'src/app/services/user.service';
import { HeaderTitleService } from 'src/app/shared/HeaderTitleService';
import { Constants } from 'src/app/constans';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const mockUserService = jasmine.createSpyObj('UserService', ['isAnyUserAuthorized', 'getCurrentUserFullName', 'logIn', 'logOut']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        Constants,
        HeaderTitleService,
        { provide: UserService, useValue: mockUserService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('HeaderComponent: should create', () => {
    expect(component).toBeTruthy();
  });

  it('HeaderComponent.getlogInOrOutText(): should return "Log out" if logged in', () => {
    mockUserService.isAnyUserAuthorized.and.returnValue(true);

    const expectedText = 'Log out';
    const actualText = component.getlogInOrOutText();

    expect(expectedText).toEqual(actualText);
  });

  it('HeaderComponent.getlogInOrOutText(): should return "Log in" if logged out', () => {
    mockUserService.isAnyUserAuthorized.and.returnValue(false);

    const expectedText = 'Log in';
    const actualText = component.getlogInOrOutText();

    expect(expectedText).toEqual(actualText);
  });

  it('HeaderComponent.isUserAuthorized(): should return "true" if logged in', () => {
    mockUserService.isAnyUserAuthorized.and.returnValue(true);

    const expectedStatus = true;
    const actualStatus = component.isUserAuthorized();

    expect(expectedStatus).toEqual(actualStatus);
  });

  it('HeaderComponent.isUserAuthorized(): should return "false" if logged out', () => {
    mockUserService.isAnyUserAuthorized.and.returnValue(false);

    const expectedStatus = false;
    const actualStatus = component.isUserAuthorized();

    expect(expectedStatus).toEqual(actualStatus);
  });

  it('HeaderComponent.getCurrentUserFullName(): should return a user name if logged in', () => {
    const userName = 'User Name';
    mockUserService.isAnyUserAuthorized.and.returnValue(true);
    mockUserService.getCurrentUserFullName.and.returnValue(userName);

    const expectedName = userName;
    const actualName = component.getCurrentUserFullName();

    expect(expectedName).toEqual(actualName);
  });

  it('HeaderComponent.getCurrentUserFullName(): should return an empty string if logged out', () => {
    mockUserService.isAnyUserAuthorized.and.returnValue(false);

    const expectedName = '';
    const actualName = component.getCurrentUserFullName();

    expect(expectedName).toEqual(actualName);
  });

  it('HeaderComponent.logInOrOut(): should call "logIn" method if logged out', () => {
    mockUserService.isAnyUserAuthorized.and.returnValue(false);

    component.logInOrOut();

    expect(mockUserService.logIn).toHaveBeenCalled();
  });

  it('HeaderComponent.logInOrOut(): should call "logOut" method if logged in', () => {
    mockUserService.isAnyUserAuthorized.and.returnValue(true);

    component.logInOrOut();

    expect(mockUserService.logOut).toHaveBeenCalled();
  });
});
