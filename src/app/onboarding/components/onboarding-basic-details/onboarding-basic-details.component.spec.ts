import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OnboardingBasicDetailsComponent } from "./onboarding-basic-details.component";

describe("OnboardingBasicDetailsComponent", () => {
  let component: OnboardingBasicDetailsComponent;
  let fixture: ComponentFixture<OnboardingBasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnboardingBasicDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
