import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapStatisticsComponent } from './roadmap-statistics.component';

describe('RoadmapStatisticsComponent', () => {
  let component: RoadmapStatisticsComponent;
  let fixture: ComponentFixture<RoadmapStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadmapStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadmapStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
