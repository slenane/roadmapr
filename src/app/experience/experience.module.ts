import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "../core/core.module";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromExperience from "./store/experience.reducer";
import { ExperienceEffects } from "./store/experience.effects";
import { ExperienceService } from "./services/experience.service";
import { ExperienceStoreService } from "./services/experience-store.service";
import { ExperienceComponent } from "./components/experience.component";
import { ExperienceItemComponent } from "./components/experience-item/experience-item.component";
import { ExperienceUpdateComponent } from "./components/experience-update/experience-update.component";
import { ExperienceItemDetailsComponent } from "./components/experience-item/experience-item-details/experience-item-details.component";
import { TranslateModule } from "@ngx-translate/core";
import { ExperienceRoutingModule } from "./experience-routing.module";
import { RecommendationsModule } from "../recommendations/recommendations.module";

@NgModule({
  declarations: [
    ExperienceComponent,
    ExperienceUpdateComponent,
    ExperienceItemComponent,
    ExperienceItemDetailsComponent,
  ],
  exports: [
    ExperienceComponent,
    ExperienceUpdateComponent,
    ExperienceItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    StoreModule.forFeature("experience", fromExperience.reducer),
    EffectsModule.forFeature([ExperienceEffects]),
    TranslateModule.forChild(),
    ExperienceRoutingModule,
    RecommendationsModule,
  ],
  providers: [ExperienceService, ExperienceStoreService],
})
export class ExperienceModule {}
