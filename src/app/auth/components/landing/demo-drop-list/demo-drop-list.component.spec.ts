import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoDropListComponent } from './demo-drop-list.component';

describe('DemoDropListComponent', () => {
  let component: DemoDropListComponent;
  let fixture: ComponentFixture<DemoDropListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoDropListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoDropListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
