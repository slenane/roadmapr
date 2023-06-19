import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentFiltersComponent } from './employment-filters.component';

describe('EmploymentFiltersComponent', () => {
  let component: EmploymentFiltersComponent;
  let fixture: ComponentFixture<EmploymentFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploymentFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
