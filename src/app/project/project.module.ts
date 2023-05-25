import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { ProjectComponent } from "./components/project.component";
// import { RoadmapService } from "./services/roadmap.service";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "../core/core.module";
import { CommonModule } from "@angular/common";
// import { StoreModule } from "@ngrx/store";
// import { EffectsModule } from "@ngrx/effects";
// import * as fromRoadmap from "./store/roadmap.reducer";
// import { RoadmapEffects } from "./store/roadmap.effects";
// import { RoadmapStoreService } from "./services/roadmap-store.service";

@NgModule({
  declarations: [ProjectComponent],
  exports: [ProjectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    // StoreModule.forFeature("project", fromRoadmap.reducer),
    // EffectsModule.forFeature([RoadmapEffects]),
  ],
  // providers: [RoadmapService, RoadmapStoreService],
})
export class ProjectModule {}
