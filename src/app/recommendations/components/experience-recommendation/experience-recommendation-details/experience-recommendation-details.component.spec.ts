import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ExperienceRecommendationDetailsComponent } from "./experience-recommendation-details.component";

describe("ExperienceRecommendationDetailsComponent", () => {
  let component: ExperienceRecommendationDetailsComponent;
  let fixture: ComponentFixture<ExperienceRecommendationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExperienceRecommendationDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceRecommendationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
