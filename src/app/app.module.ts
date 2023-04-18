import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmploymentComponent } from "./employment/employment.component";
import { SettingsComponent } from "./settings/settings.component";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./material/material.module";
import { SharedModule } from "./shared/shared.module";
import { AuthGuardService } from "./auth-guard.service";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { RoadmapEffects } from "./roadmap/store/roadmap.effects";
import { AuthEffects } from "./core/store/auth.effects";
import { CoreModule } from "./core/core.module";
import { RoadmapModule } from "./roadmap/roadmap.module";
import { ProfileModule } from "./profile/profile.module";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmploymentComponent,
    SettingsComponent,
  ],
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([RoadmapEffects, AuthEffects]),
    CoreModule,
    RoadmapModule,
    ProfileModule,
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
