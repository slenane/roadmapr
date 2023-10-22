import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProfileContentCardComponent } from "./profile-content-card.component";

describe("ProfileContentCardComponent", () => {
  let component: ProfileContentCardComponent;
  let fixture: ComponentFixture<ProfileContentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileContentCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileContentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
