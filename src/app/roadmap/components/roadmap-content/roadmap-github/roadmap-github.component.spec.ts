import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RoadmapGithubComponent } from "./roadmap-github.component";

describe("RoadmapGithubComponent", () => {
  let component: RoadmapGithubComponent;
  let fixture: ComponentFixture<RoadmapGithubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoadmapGithubComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoadmapGithubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
