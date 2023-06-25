import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EducationUpdateDegreeComponent } from "./education-update-degree.component";

describe("EducationUpdateDegreeComponent", () => {
  let component: EducationUpdateDegreeComponent;
  let fixture: ComponentFixture<EducationUpdateDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationUpdateDegreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationUpdateDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
