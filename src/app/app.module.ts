import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule, CustomTitleStrategy } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  HttpClient,
  HttpClientModule,
  HttpClientXsrfModule,
} from "@angular/common/http";
import { MaterialModule } from "./material/material.module";
import { SharedModule } from "./shared/shared.module";
import { AuthGuardService } from "./auth-guard.service";
import { EffectsModule } from "@ngrx/effects";
import { ActionReducer, MetaReducer, StoreModule } from "@ngrx/store";
import { CoreModule } from "./core/core.module";
import { EducationModule } from "./education/education.module";
import { ProfileModule } from "./profile/profile.module";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ProjectsModule } from "./projects/projects.module";
import { ExperienceModule } from "./experience/experience.module";
import { SettingsModule } from "./settings/settings.module";
import { RoadmapModule } from "./roadmap/roadmap.module";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AuthModule } from "./auth/auth.module";
import { LOGOUT } from "./auth/store/auth.actions";
import { DELETE_ACCOUNT } from "./settings/store/settings.actions";
import { TitleStrategy } from "@angular/router";
import { OnboardingModule } from "./onboarding/onboarding.module";
import { HomeModule } from "./home/home.module";
import { RecommendationsModule } from "./recommendations/recommendations.module";

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === LOGOUT || action.type === DELETE_ACCOUNT) {
      state = {};
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearState];

@NgModule({
  declarations: [AppComponent],
  imports: [
    StoreModule.forRoot(
      {},
      {
        metaReducers,
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
    AuthModule,
    CoreModule,
    HomeModule,
    ExperienceModule,
    RoadmapModule,
    EducationModule,
    RecommendationsModule,
    ProfileModule,
    ProjectsModule,
    SettingsModule,
    OnboardingModule,
    HttpClientModule,
    HttpClientXsrfModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [
    AuthGuardService,
    { provide: TitleStrategy, useClass: CustomTitleStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// Translation service
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
