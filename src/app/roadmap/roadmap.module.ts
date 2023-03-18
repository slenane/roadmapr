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
  ],
  imports: [SharedModule, MaterialModule],
  providers: [RoadmapService],
})
export class SharedModule {}
