import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { RoadmapFiltersComponent } from "./components/roadmap-filters/roadmap-filters.component";
import { RoadmapItemComponent } from "./components/roadmap-item/roadmap-item.component";
import { RoadmapStatisticsComponent } from "./components/roadmap-statistics/roadmap-statistics.component";
import { RoadmapUpdateBookComponent } from "./components/roadmap-update/roadmap-update-book/roadmap-update-book.component";
import { RoadmapUpdateCourseComponent } from "./components/roadmap-update/roadmap-update-course/roadmap-update-course.component";
import { RoadmapUpdateDegreeComponent } from "./components/roadmap-update/roadmap-update-degree/roadmap-update-degree.component";
import { RoadmapUpdateTutorialComponent } from "./components/roadmap-update/roadmap-update-tutorial/roadmap-update-tutorial.component";
import { RoadmapUpdateComponent } from "./components/roadmap-update/roadmap-update.component";
import { RoadmapComponent } from "./components/roadmap.component";
import { RoadmapService } from "./services/roadmap.service";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "../core/core.module";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromRoadmap from "./store/roadmap.reducer";
import { RoadmapEffects } from "./store/roadmap.effects";
import { RoadmapStoreService } from "./services/roadmap-store.service";
import { RoadmapItemDetailsComponent } from "./components/roadmap-item/roadmap-item-details/roadmap-item-details.component";

@NgModule({
  declarations: [
    RoadmapFiltersComponent,
    RoadmapItemComponent,
    RoadmapComponent,
    RoadmapStatisticsComponent,
    RoadmapUpdateBookComponent,
    RoadmapUpdateComponent,
    RoadmapUpdateCourseComponent,
    RoadmapUpdateTutorialComponent,
    RoadmapUpdateDegreeComponent,
    RoadmapItemDetailsComponent,
  ],
  exports: [
    RoadmapFiltersComponent,
    RoadmapItemComponent,
    RoadmapComponent,
    RoadmapStatisticsComponent,
    RoadmapUpdateBookComponent,
    RoadmapUpdateComponent,
    RoadmapUpdateCourseComponent,
    RoadmapUpdateTutorialComponent,
    RoadmapUpdateDegreeComponent,
    RoadmapItemDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    StoreModule.forFeature("roadmap", fromRoadmap.reducer),
    EffectsModule.forFeature([RoadmapEffects]),
  ],
  providers: [RoadmapService, RoadmapStoreService],
})
export class RoadmapModule {}
