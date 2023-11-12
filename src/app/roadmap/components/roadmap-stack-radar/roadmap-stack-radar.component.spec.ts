import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RoadmapStackRadarComponent } from "./roadmap-stack-radar.component";

describe("RoadmapStackRadarComponent", () => {
  let component: RoadmapStackRadarComponent;
  let fixture: ComponentFixture<RoadmapStackRadarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoadmapStackRadarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoadmapStackRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
