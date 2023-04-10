import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LandingComponent } from "./core/components/landing/landing.component";
import { RoadmapComponent } from "./roadmap/components/roadmap.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProfileComponent } from "./profile/profile.component";
import { EmploymentComponent } from "./employment/employment.component";
import { SettingsComponent } from "./settings/settings.component";
import { RoadmapItemComponent } from "./roadmap/components/roadmap-item/roadmap-item.component";
import { ApiService } from "./core/services/api.service";
import { UrlService } from "./core/services/url.service";
import { RoadmapService } from "./roadmap/services/roadmap.service";
import { HttpClientModule } from "@angular/common/http";
import { RoadmapStatisticsComponent } from "./roadmap/components/roadmap-statistics/roadmap-statistics.component";
import { RoadmapUpdateComponent } from "./roadmap/components/roadmap-update/roadmap-update.component";
import { RoadmapFiltersComponent } from "./roadmap/components/roadmap-filters/roadmap-filters.component";
import { RoadmapUpdateBookComponent } from "./roadmap/components/roadmap-update/roadmap-update-book/roadmap-update-book.component";
import { RoadmapUpdateCourseComponent } from "./roadmap/components/roadmap-update/roadmap-update-course/roadmap-update-course.component";
import { RoadmapUpdateDegreeComponent } from "./roadmap/components/roadmap-update/roadmap-update-degree/roadmap-update-degree.component";
import { RoadmapUpdateTutorialComponent } from "./roadmap/components/roadmap-update/roadmap-update-tutorial/roadmap-update-tutorial.component";
import { MaterialModule } from "./material/material.module";
import { SharedModule } from "./shared/shared.module";
import { LogInComponent } from "./core/components/log-in/log-in.component";
import { RegisterComponent } from "./core/components/register/register.component";
import { AuthService } from "./core/services/auth.service";
import { AuthGuardService } from "./auth-guard.service";
import { ProfileOverviewComponent } from './profile/profile-overview/profile-overview.component';
import { ProfileSkillsComponent } from './profile/profile-skills/profile-skills.component';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RoadmapComponent,
    DashboardComponent,
    ProfileComponent,
    EmploymentComponent,
    SettingsComponent,
    RoadmapItemComponent,
    RoadmapStatisticsComponent,
    RoadmapUpdateComponent,
    RoadmapFiltersComponent,
    RoadmapUpdateBookComponent,
    RoadmapUpdateCourseComponent,
    RoadmapUpdateDegreeComponent,
    RoadmapUpdateTutorialComponent,
    LogInComponent,
    RegisterComponent,
    ProfileOverviewComponent,
    ProfileSkillsComponent,
    ProfileInfoComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [
    ApiService,
    UrlService,
    RoadmapService,
    AuthService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
