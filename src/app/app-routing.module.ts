import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/components/dashboard.component";
import { EmploymentComponent } from "./employment/components/employment.component";
import { LandingComponent } from "./core/components/landing/landing.component";
import { ProfileComponent } from "./profile/components/profile.component";
import { ProjectsComponent } from "./projects/components/projects.component";
import { EducationComponent } from "./education/components/education.component";
import { SettingsComponent } from "./settings/components/settings.component";
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
    path: "education",
    component: EducationComponent,
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
