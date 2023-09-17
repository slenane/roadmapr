import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./material/material.module";
import { SharedModule } from "./shared/shared.module";
import { AuthGuardService } from "./auth-guard.service";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { CoreModule } from "./core/core.module";
import { EducationModule } from "./education/education.module";
import { ProfileModule } from "./profile/profile.module";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ProjectsModule } from "./projects/projects.module";
import { EmploymentModule } from "./employment/employment.module";
import { SettingsModule } from "./settings/settings.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { NgChartsModule } from "ng2-charts";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateService } from "@ngx-translate/core";

@NgModule({
  declarations: [AppComponent],
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
    TranslateModule.forRoot({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    CoreModule,
    EmploymentModule,
    DashboardModule,
    EducationModule,
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
    NgChartsModule,
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}

// Translation service
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
