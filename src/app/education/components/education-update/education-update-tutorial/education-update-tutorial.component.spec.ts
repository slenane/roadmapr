import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EducationUpdateTutorialComponent } from "./education-update-tutorial.component";

describe("EducationUpdateTutorialComponent", () => {
  let component: EducationUpdateTutorialComponent;
  let fixture: ComponentFixture<EducationUpdateTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationUpdateTutorialComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationUpdateTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
