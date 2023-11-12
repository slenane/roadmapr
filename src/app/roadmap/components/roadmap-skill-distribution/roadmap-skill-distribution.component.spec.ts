import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RoadmapSkillDistributionComponent } from "./roadmap-skill-distribution.component";

describe("RoadmapSkillDistributionComponent", () => {
  let component: RoadmapSkillDistributionComponent;
  let fixture: ComponentFixture<RoadmapSkillDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoadmapSkillDistributionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoadmapSkillDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
