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
import { RoadmapStackComponent } from "./components/roadmap-content/roadmap-stack/roadmap-stack.component";
import { RoadmapGithubComponent } from "./components/roadmap-content/roadmap-github/roadmap-github.component";
import { RoadmapFiltersComponent } from "./components/roadmap-filters/roadmap-filters.component";
import { RoadmapEducationComponent } from "./components/roadmap-content/roadmap-education/roadmap-education.component";
import { RoadmapProjectsComponent } from "./components/roadmap-content/roadmap-projects/roadmap-projects.component";
import { TranslateModule } from "@ngx-translate/core";
import { RoadmapRoutingModule } from "./roadmap-routing.module";
import { RoadmapUpdateComponent } from "./components/roadmap-update/roadmap-update.component";
import { RoadmapOverviewComponent } from "./components/roadmap-content/roadmap-overview/roadmap-overview.component";
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  declarations: [
    RoadmapComponent,
    RoadmapStackComponent,
    RoadmapGithubComponent,
    RoadmapFiltersComponent,
    RoadmapEducationComponent,
    RoadmapProjectsComponent,
    RoadmapUpdateComponent,
    RoadmapOverviewComponent,
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
    NgApexchartsModule,
  ],
  providers: [RoadmapStoreService, RoadmapService],
})
export class RoadmapModule {}
