import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceRecommendationComponent } from './experience-recommendation.component';

describe('ExperienceRecommendationComponent', () => {
  let component: ExperienceRecommendationComponent;
  let fixture: ComponentFixture<ExperienceRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceRecommendationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
