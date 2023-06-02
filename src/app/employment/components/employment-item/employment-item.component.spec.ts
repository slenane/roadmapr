import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EmploymentItemComponent } from "./employment-item.component";

describe("EmploymentItemComponent", () => {
  let component: EmploymentItemComponent;
  let fixture: ComponentFixture<EmploymentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmploymentItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmploymentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
