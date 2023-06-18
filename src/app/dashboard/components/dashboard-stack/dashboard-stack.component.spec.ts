import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStackComponent } from './dashboard-stack.component';

describe('DashboardStackComponent', () => {
  let component: DashboardStackComponent;
  let fixture: ComponentFixture<DashboardStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardStackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
