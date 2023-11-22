import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RoadmapEducationComponent } from "./roadmap-education.component";

describe("RoadmapEducationComponent", () => {
  let component: RoadmapEducationComponent;
  let fixture: ComponentFixture<RoadmapEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoadmapEducationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoadmapEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
