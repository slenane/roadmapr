import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { ProjectsComponent } from "./components/projects.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "../core/core.module";
import { CommonModule } from "@angular/common";
import { ProjectsService } from "./services/projects.service";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromProject from "./store/projects.reducer";
import { ProjectEffects } from "./store/projects.effects";
import { ProjectsStoreService } from "../projects/services/projects-store.service";
import { ProjectComponent } from "./components/project/project.component";
import { ProjectDetailsComponent } from "./components/project/project-details/project-details.component";
import { ProjectsUpdateComponent } from "./components/projects-update/projects-update.component";
import { ProjectsFiltersComponent } from "./components/projects-filters/projects-filters.component";

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectComponent,
    ProjectDetailsComponent,
    ProjectsUpdateComponent,
    ProjectsFiltersComponent,
  ],
  exports: [
    ProjectsComponent,
    ProjectComponent,
    ProjectDetailsComponent,
    ProjectsUpdateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    StoreModule.forFeature("projects", fromProject.reducer),
    EffectsModule.forFeature([ProjectEffects]),
  ],
  providers: [ProjectsService, ProjectsStoreService],
})
export class ProjectsModule {}
