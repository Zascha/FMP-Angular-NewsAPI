import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { HeaderTitleService } from 'src/app/shared/HeaderTitleService';
import { NewsSourceProviderService } from 'src/app/services/news-source-provider.service';
import { SearchParamsService } from 'src/app/services/search-params.service';
import { UserService } from 'src/app/services/user.service';
import { Constants } from 'src/app/constans';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterComponent ],
      providers: [
        ReactiveFormsModule,
        FormsModule,
        FormGroup,
        FormControl,
        HeaderTitleService,
        NewsSourceProviderService,
        SearchParamsService,
        UserService,
        Constants ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //it('should create', () => {
  //   expect(component).toBeTruthy();
  //});
});
