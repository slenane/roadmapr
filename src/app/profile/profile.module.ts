import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { ProfileComponent } from "./components/profile.component";
import { ProfileCardComponent } from "./components/profile-card/profile-card.component";
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
import { TranslateModule } from "@ngx-translate/core";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { ProfileEditBasicInfoComponent } from './components/profile-edit/profile-edit-basic-info/profile-edit-basic-info.component';
import { ProfileEditLanguagesComponent } from './components/profile-edit/profile-edit-languages/profile-edit-languages.component';
import { ProfileEditEducationComponent } from './components/profile-edit/profile-edit-education/profile-edit-education.component';
import { ProfileEditInterestsComponent } from './components/profile-edit/profile-edit-interests/profile-edit-interests.component';
import { ProfileEditSocialComponent } from './components/profile-edit/profile-edit-social/profile-edit-social.component';

@NgModule({
  declarations: [ProfileComponent, ProfileCardComponent, ProfileEditComponent, ProfileDetailsComponent, ProfileEditBasicInfoComponent, ProfileEditLanguagesComponent, ProfileEditEducationComponent, ProfileEditInterestsComponent, ProfileEditSocialComponent],
  exports: [ProfileComponent, ProfileCardComponent, ProfileEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    StoreModule.forFeature("profile", fromProfile.reducer),
    EffectsModule.forFeature([ProfileEffects]),
    TranslateModule.forChild(),
    ProfileRoutingModule,
  ],
  providers: [ProfileStoreService, ProfileService],
})
export class ProfileModule {}
