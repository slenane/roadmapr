import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EducationUpdateComponent } from "./education-update.component";

describe("EducationUpdateComponent", () => {
  let component: EducationUpdateComponent;
  let fixture: ComponentFixture<EducationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationUpdateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
