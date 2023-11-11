import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropListEmptyComponent } from './drop-list-empty.component';

describe('DropListEmptyComponent', () => {
  let component: DropListEmptyComponent;
  let fixture: ComponentFixture<DropListEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropListEmptyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropListEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
