import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DashboardProjectsOverviewComponent } from "./dashboard-projects-overview.component";

describe("DashboardProjectsOverviewComponent", () => {
  let component: DashboardProjectsOverviewComponent;
  let fixture: ComponentFixture<DashboardProjectsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardProjectsOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardProjectsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
