import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDistributionSliderComponent } from './dashboard-distribution-slider.component';

describe('DashboardDistributionSliderComponent', () => {
  let component: DashboardDistributionSliderComponent;
  let fixture: ComponentFixture<DashboardDistributionSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDistributionSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDistributionSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
