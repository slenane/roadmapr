import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropListDateComponent } from './drop-list-date.component';

describe('DropListDateComponent', () => {
  let component: DropListDateComponent;
  let fixture: ComponentFixture<DropListDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropListDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropListDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
