import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EducationRecommendationComponent } from "./education-recommendation.component";

describe("EducationRecommendationComponent", () => {
  let component: EducationRecommendationComponent;
  let fixture: ComponentFixture<EducationRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationRecommendationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
