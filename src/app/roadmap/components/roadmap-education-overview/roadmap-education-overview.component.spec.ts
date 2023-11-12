import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RoadmapEducationOverviewComponent } from "./roadmap-education-overview.component";

describe("RoadmapEducationOverviewComponent", () => {
  let component: RoadmapEducationOverviewComponent;
  let fixture: ComponentFixture<RoadmapEducationOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoadmapEducationOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoadmapEducationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
