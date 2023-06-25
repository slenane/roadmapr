import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EducationUpdateCourseComponent } from "./education-update-course.component";

describe("EducationUpdateCourseComponent", () => {
  let component: EducationUpdateCourseComponent;
  let fixture: ComponentFixture<EducationUpdateCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationUpdateCourseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationUpdateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
