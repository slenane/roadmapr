import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoAreaChartComponent } from './demo-area-chart.component';

describe('DemoAreaChartComponent', () => {
  let component: DemoAreaChartComponent;
  let fixture: ComponentFixture<DemoAreaChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoAreaChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoAreaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
