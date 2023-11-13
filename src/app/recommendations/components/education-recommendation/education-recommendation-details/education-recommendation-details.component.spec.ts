import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EducationRecommendationDetailsComponent } from "./education-recommendation-details.component";

describe("EducationRecommendationDetailsComponent", () => {
  let component: EducationRecommendationDetailsComponent;
  let fixture: ComponentFixture<EducationRecommendationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationRecommendationDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationRecommendationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
