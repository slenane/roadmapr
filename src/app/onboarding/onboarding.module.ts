import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { OnboardingComponent } from "./components/onboarding.component";
import { OnboardingRoutingModule } from "./onboarding-routing.module";
import { OnboardingBasicDetailsComponent } from "./components/onboarding-basic-details/onboarding-basic-details.component";
import { OnboardingPathQuizComponent } from "./components/onboarding-path-quiz/onboarding-path-quiz.component";
import { OnboardingTourComponent } from "./components/onboarding-tour/onboarding-tour.component";
import { OnboardingService } from "./services/onboarding.service";
import { ProfileModule } from "../profile/profile.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    OnboardingComponent,
    OnboardingBasicDetailsComponent,
    OnboardingPathQuizComponent,
    OnboardingTourComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forChild(),
    OnboardingRoutingModule,
    ProfileModule,
    SharedModule,
  ],
  providers: [OnboardingService],
})
export class OnboardingModule {}
