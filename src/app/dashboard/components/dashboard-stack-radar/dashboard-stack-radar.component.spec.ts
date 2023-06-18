import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStackRadarComponent } from './dashboard-stack-radar.component';

describe('DashboardStackRadarComponent', () => {
  let component: DashboardStackRadarComponent;
  let fixture: ComponentFixture<DashboardStackRadarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardStackRadarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStackRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
