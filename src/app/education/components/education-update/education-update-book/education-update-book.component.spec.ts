import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EducationUpdateBookComponent } from "./education-update-book.component";

describe("EducationUpdateBookComponent", () => {
  let component: EducationUpdateBookComponent;
  let fixture: ComponentFixture<EducationUpdateBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationUpdateBookComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationUpdateBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
