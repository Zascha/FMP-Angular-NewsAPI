import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsEditFormComponent } from './news-edit-form.component';

describe('NewsEditFormComponent', () => {
  let component: NewsEditFormComponent;
  let fixture: ComponentFixture<NewsEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
