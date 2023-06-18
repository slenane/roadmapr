import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGithubComponent } from './dashboard-github.component';

describe('DashboardGithubComponent', () => {
  let component: DashboardGithubComponent;
  let fixture: ComponentFixture<DashboardGithubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardGithubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardGithubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
