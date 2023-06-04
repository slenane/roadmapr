import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./material/material.module";
import { SharedModule } from "./shared/shared.module";
import { AuthGuardService } from "./auth-guard.service";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { CoreModule } from "./core/core.module";
import { RoadmapModule } from "./roadmap/roadmap.module";
import { ProfileModule } from "./profile/profile.module";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ProjectsModule } from "./projects/projects.module";
import { EmploymentModule } from "./employment/employment.module";
import { SettingsModule } from "./settings/settings.module";

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: false,
          strictActionSerializability: false,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({}),
    CoreModule,
    EmploymentModule,
    RoadmapModule,
    ProfileModule,
    ProjectsModule,
    SettingsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
