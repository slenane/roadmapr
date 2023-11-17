import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OnboardingPathQuizComponent } from "./onboarding-path-quiz.component";

describe("OnboardingPathQuizComponent", () => {
  let component: OnboardingPathQuizComponent;
  let fixture: ComponentFixture<OnboardingPathQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnboardingPathQuizComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingPathQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
