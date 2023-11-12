import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RoadmapStackComponent } from "./roadmap-stack.component";

describe("RoadmapStackComponent", () => {
  let component: RoadmapStackComponent;
  let fixture: ComponentFixture<RoadmapStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoadmapStackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoadmapStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
