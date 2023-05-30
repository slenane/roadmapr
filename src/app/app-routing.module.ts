import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmploymentComponent } from "./employment/employment.component";
import { LandingComponent } from "./core/components/landing/landing.component";
import { ProfileComponent } from "./profile/components/profile.component";
import { ProjectsComponent } from "./projects/components/projects.component";
import { RoadmapComponent } from "./roadmap/components/roadmap.component";
import { SettingsComponent } from "./settings/settings.component";
import { AuthGuardService } from "./auth-guard.service";

const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "register", component: LandingComponent },
  { path: "login", component: LandingComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "roadmap",
    component: RoadmapComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "projects",
    component: ProjectsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "employment",
    component: EmploymentComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "settings",
    component: SettingsComponent,
    canActivate: [AuthGuardService],
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
