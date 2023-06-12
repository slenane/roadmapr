import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { ProfileComponent } from "./components/profile.component";
import { ProfileSkillsComponent } from "./components/profile-skills/profile-skills.component";
import { ProfileInfoComponent } from "./components/profile-info/profile-info.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "../core/core.module";
import { CommonModule } from "@angular/common";
import { ProfileStoreService } from "./services/profile-store.service";
import { ProfileService } from "./services/profile.service";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromProfile from "./store/profile.reducer";
import { ProfileEffects } from "./store/profile.effects";
import { ProfileEditComponent } from "./components/profile-edit/profile-edit.component";

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileSkillsComponent,
    ProfileInfoComponent,
    ProfileEditComponent,
  ],
  exports: [
    ProfileComponent,
    ProfileSkillsComponent,
    ProfileInfoComponent,
    ProfileEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    StoreModule.forFeature("profile", fromProfile.reducer),
    EffectsModule.forFeature([ProfileEffects]),
  ],
  providers: [ProfileStoreService, ProfileService],
})
export class ProfileModule {}
