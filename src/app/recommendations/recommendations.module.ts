import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { RecommendationsService } from "./services/recommendations.service";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromRecommendations from "./store/recommendations.reducer";
import { RecommendationsEffects } from "./store/recommendations.effects";
import { ExperienceRecommendationComponent } from "./components/experience-recommendation/experience-recommendation.component";
import { EducationRecommendationComponent } from "./components/education-recommendation/education-recommendation.component";
import { EducationRecommendationDetailsComponent } from "./components/education-recommendation/education-recommendation-details/education-recommendation-details.component";
import { ExperienceRecommendationDetailsComponent } from "./components/experience-recommendation/experience-recommendation-details/experience-recommendation-details.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    EducationRecommendationComponent,
    EducationRecommendationDetailsComponent,
    ExperienceRecommendationComponent,
    ExperienceRecommendationDetailsComponent,
  ],
  exports: [
    EducationRecommendationComponent,
    ExperienceRecommendationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    TranslateModule.forChild(),
    StoreModule.forFeature("recommendations", fromRecommendations.reducer),
    EffectsModule.forFeature([RecommendationsEffects]),
  ],
  providers: [RecommendationsService],
})
export class RecommendationsModule {}
