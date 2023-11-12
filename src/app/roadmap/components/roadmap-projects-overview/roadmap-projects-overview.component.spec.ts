import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RoadmapProjectsOverviewComponent } from "./roadmap-projects-overview.component";

describe("RoadmapProjectsOverviewComponent", () => {
  let component: RoadmapProjectsOverviewComponent;
  let fixture: ComponentFixture<RoadmapProjectsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoadmapProjectsOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoadmapProjectsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
