import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropListFiltersComponent } from './drop-list-filters.component';

describe('DropListFiltersComponent', () => {
  let component: DropListFiltersComponent;
  let fixture: ComponentFixture<DropListFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropListFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropListFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
