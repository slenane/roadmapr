import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "../core/core.module";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromEmployment from "./store/employment.reducer";
import { EmploymentEffects } from "./store/employment.effects";
import { EmploymentService } from "./services/employment.service";
import { EmploymentStoreService } from "./services/employment-store.service";
import { EmploymentComponent } from "./components/employment.component";
import { EmploymentItemComponent } from "./components/employment-item/employment-item.component";
import { EmploymentUpdateComponent } from "./components/employment-update/employment-update.component";
import { EmploymentFiltersComponent } from './components/employment-filters/employment-filters.component';

@NgModule({
  declarations: [
    EmploymentComponent,
    EmploymentUpdateComponent,
    EmploymentItemComponent,
    EmploymentFiltersComponent,
  ],
  exports: [
    EmploymentComponent,
    EmploymentUpdateComponent,
    EmploymentItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    StoreModule.forFeature("employment", fromEmployment.reducer),
    EffectsModule.forFeature([EmploymentEffects]),
  ],
  providers: [EmploymentService, EmploymentStoreService],
})
export class EmploymentModule {}
