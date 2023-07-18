import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DashboardUserOverviewComponent } from "./dashboard-user-overview.component";

describe("DashboardUserOverviewComponent", () => {
  let component: DashboardUserOverviewComponent;
  let fixture: ComponentFixture<DashboardUserOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardUserOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardUserOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
