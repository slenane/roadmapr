import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmploymentComponent } from './employment/employment.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employment', component: EmploymentComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'roadmap', component: RoadmapComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
