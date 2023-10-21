import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProfileContentMainComponent } from "./profile-content-main.component";

describe("ProfileContentMainComponent", () => {
  let component: ProfileContentMainComponent;
  let fixture: ComponentFixture<ProfileContentMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileContentMainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileContentMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
