import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropListFilterItemsComponent } from './drop-list-filter-items.component';

describe('DropListFilterItemsComponent', () => {
  let component: DropListFilterItemsComponent;
  let fixture: ComponentFixture<DropListFilterItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropListFilterItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropListFilterItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
