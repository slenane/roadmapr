import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { ProjectsComponent } from "./components/projects.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "../core/core.module";
import { CommonModule } from "@angular/common";
import { ProjectService } from "./services/project.service";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromProject from "./store/project.reducer";
import { ProjectEffects } from "./store/project.effects";
import { ProjectStoreService } from "./services/project-store.service";
import { ProjectComponent } from "./components/project/project.component";
import { ProjectDetailsComponent } from "./components/project/project-details/project-details.component";

@NgModule({
  declarations: [ProjectsComponent, ProjectComponent, ProjectDetailsComponent],
  exports: [ProjectsComponent, ProjectComponent, ProjectDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    StoreModule.forFeature("project", fromProject.reducer),
    EffectsModule.forFeature([ProjectEffects]),
  ],
  providers: [ProjectService, ProjectStoreService],
})
export class ProjectModule {}
