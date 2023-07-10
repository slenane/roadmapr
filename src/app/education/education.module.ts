import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { EducationItemComponent } from "./components/education-item/education-item.component";
import { EducationUpdateBookComponent } from "./components/education-update/education-update-book/education-update-book.component";
import { EducationUpdateCourseComponent } from "./components/education-update/education-update-course/education-update-course.component";
import { EducationUpdateDegreeComponent } from "./components/education-update/education-update-degree/education-update-degree.component";
import { EducationUpdateTutorialComponent } from "./components/education-update/education-update-tutorial/education-update-tutorial.component";
import { EducationUpdateComponent } from "./components/education-update/education-update.component";
import { EducationComponent } from "./components/education.component";
import { EducationService } from "./services/education.service";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "../core/core.module";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromEducation from "./store/education.reducer";
import { EducationEffects } from "./store/education.effects";
import { EducationStoreService } from "./services/education-store.service";
import { EducationItemDetailsComponent } from "./components/education-item/education-item-details/education-item-details.component";

@NgModule({
  declarations: [
    EducationItemComponent,
    EducationComponent,
    EducationUpdateBookComponent,
    EducationUpdateComponent,
    EducationUpdateCourseComponent,
    EducationUpdateTutorialComponent,
    EducationUpdateDegreeComponent,
    EducationItemDetailsComponent,
  ],
  exports: [
    EducationItemComponent,
    EducationComponent,
    EducationUpdateBookComponent,
    EducationUpdateComponent,
    EducationUpdateCourseComponent,
    EducationUpdateTutorialComponent,
    EducationUpdateDegreeComponent,
    EducationItemDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    StoreModule.forFeature("education", fromEducation.reducer),
    EffectsModule.forFeature([EducationEffects]),
  ],
  providers: [EducationService, EducationStoreService],
})
export class EducationModule {}