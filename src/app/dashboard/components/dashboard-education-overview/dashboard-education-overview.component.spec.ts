import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DashboardEducationOverviewComponent } from "./dashboard-education-overview.component";

describe("DashboardEducationOverviewComponent", () => {
  let component: DashboardEducationOverviewComponent;
  let fixture: ComponentFixture<DashboardEducationOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardEducationOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardEducationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
