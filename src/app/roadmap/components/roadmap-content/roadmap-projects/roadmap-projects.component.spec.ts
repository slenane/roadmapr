import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RoadmapProjectsComponent } from "./roadmap-projects.component";

describe("RoadmapProjectsComponent", () => {
  let component: RoadmapProjectsComponent;
  let fixture: ComponentFixture<RoadmapProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoadmapProjectsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoadmapProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
