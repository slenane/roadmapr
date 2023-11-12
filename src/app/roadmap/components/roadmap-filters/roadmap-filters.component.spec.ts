import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RoadmapFiltersComponent } from "./roadmap-filters.component";

describe("RoadmapFiltersComponent", () => {
  let component: RoadmapFiltersComponent;
  let fixture: ComponentFixture<RoadmapFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoadmapFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoadmapFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
