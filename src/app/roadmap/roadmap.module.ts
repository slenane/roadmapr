import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { RoadmapComponent } from "./components/roadmap.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "../core/core.module";
import { CommonModule } from "@angular/common";
import { RoadmapStoreService } from "./services/roadmap-store.service";
import { RoadmapService } from "./services/roadmap.service";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromRoadmap from "./store/roadmap.reducer";
import { RoadmapEffects } from "./store/roadmap.effects";
import { RoadmapStackComponent } from "./components/roadmap-stack/roadmap-stack.component";
import { RoadmapGithubComponent } from "./components/roadmap-github/roadmap-github.component";
import { RoadmapFiltersComponent } from "./components/roadmap-filters/roadmap-filters.component";
import { RoadmapStackRadarComponent } from "./components/roadmap-stack-radar/roadmap-stack-radar.component";
import { RoadmapEducationOverviewComponent } from "./components/roadmap-education-overview/roadmap-education-overview.component";
import { RoadmapProjectsOverviewComponent } from "./components/roadmap-projects-overview/roadmap-projects-overview.component";
import { TranslateModule } from "@ngx-translate/core";
import { RoadmapRoutingModule } from "./roadmap-routing.module";

@NgModule({
  declarations: [
    RoadmapComponent,
    RoadmapStackComponent,
    RoadmapGithubComponent,
    RoadmapFiltersComponent,
    RoadmapStackRadarComponent,
    RoadmapEducationOverviewComponent,
    RoadmapProjectsOverviewComponent,
  ],
  exports: [RoadmapComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    StoreModule.forFeature("roadmap", fromRoadmap.reducer),
    EffectsModule.forFeature([RoadmapEffects]),
    TranslateModule.forChild(),
    RoadmapRoutingModule,
  ],
  providers: [RoadmapStoreService, RoadmapService],
})
export class RoadmapModule {}
