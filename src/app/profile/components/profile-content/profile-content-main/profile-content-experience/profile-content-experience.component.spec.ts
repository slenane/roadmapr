import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProfileContentExperienceComponent } from "./profile-content-experience.component";

describe("ProfileContentExperienceComponent", () => {
  let component: ProfileContentExperienceComponent;
  let fixture: ComponentFixture<ProfileContentExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileContentExperienceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileContentExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
