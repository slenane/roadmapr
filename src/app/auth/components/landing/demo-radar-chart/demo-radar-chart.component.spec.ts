import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoRadarChartComponent } from './demo-radar-chart.component';

describe('DemoRadarChartComponent', () => {
  let component: DemoRadarChartComponent;
  let fixture: ComponentFixture<DemoRadarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoRadarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoRadarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
