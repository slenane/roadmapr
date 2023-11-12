import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ExperienceItemDetailsComponent } from "./experience-item-details.component";

describe("ExperienceItemDetailsComponent", () => {
  let component: ExperienceItemDetailsComponent;
  let fixture: ComponentFixture<ExperienceItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExperienceItemDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
