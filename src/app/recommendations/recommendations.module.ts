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
import { RecommendationComponent } from "./components/recommendation/recommendation.component";
import { RecommendationDetailsComponent } from './components/recommendation/recommendation-details/recommendation-details.component';

@NgModule({
  declarations: [RecommendationComponent, RecommendationDetailsComponent],
  exports: [RecommendationComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forChild(),
    StoreModule.forFeature("recommendations", fromRecommendations.reducer),
    EffectsModule.forFeature([RecommendationsEffects]),
  ],
  providers: [RecommendationsService],
})
export class RecommendationsModule {}
