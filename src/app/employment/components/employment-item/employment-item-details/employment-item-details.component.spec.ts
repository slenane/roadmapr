import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentItemDetailsComponent } from './employment-item-details.component';

describe('EmploymentItemDetailsComponent', () => {
  let component: EmploymentItemDetailsComponent;
  let fixture: ComponentFixture<EmploymentItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentItemDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploymentItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
