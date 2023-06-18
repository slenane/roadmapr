import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DashboardSkillDistributionComponent } from "./dashboard-skill-distribution.component";

describe("DashboardSkillDistributionComponent", () => {
  let component: DashboardSkillDistributionComponent;
  let fixture: ComponentFixture<DashboardSkillDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardSkillDistributionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardSkillDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
