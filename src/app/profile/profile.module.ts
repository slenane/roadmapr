import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { ProfileComponent } from "./components/profile.component";
import { ProfileContentCardComponent } from "./components/profile-content/profile-content-card/profile-content-card.component";
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
import { ProfileContentMainComponent } from "./components/profile-content/profile-content-main/profile-content-main.component";
import { ProfileEditBasicInfoComponent } from "./components/profile-edit/profile-edit-basic-info/profile-edit-basic-info.component";
import { ProfileEditLanguagesComponent } from "./components/profile-edit/profile-edit-languages/profile-edit-languages.component";
import { ProfileEditEducationComponent } from "./components/profile-edit/profile-edit-education/profile-edit-education.component";
import { ProfileEditInterestsComponent } from "./components/profile-edit/profile-edit-interests/profile-edit-interests.component";
import { ProfileEditSocialComponent } from "./components/profile-edit/profile-edit-social/profile-edit-social.component";
import { ProfileContentPersonalComponent } from "./components/profile-content/profile-content-main/profile-content-personal/profile-content-personal.component";
import { ProfileContentEmploymentComponent } from "./components/profile-content/profile-content-main/profile-content-employment/profile-content-employment.component";
import { ProfileContentEducationComponent } from "./components/profile-content/profile-content-main/profile-content-education/profile-content-education.component";
import { ProfileContentProjectsComponent } from "./components/profile-content/profile-content-main/profile-content-projects/profile-content-projects.component";
import { ProfileEditLayoutComponent } from "./components/profile-edit/profile-edit-layout/profile-edit-layout.component";

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileContentCardComponent,
    ProfileEditComponent,
    ProfileContentMainComponent,
    ProfileEditBasicInfoComponent,
    ProfileEditLanguagesComponent,
    ProfileEditEducationComponent,
    ProfileEditInterestsComponent,
    ProfileEditSocialComponent,
    ProfileContentPersonalComponent,
    ProfileContentEmploymentComponent,
    ProfileContentEducationComponent,
    ProfileContentProjectsComponent,
    ProfileEditLayoutComponent,
  ],
  exports: [
    ProfileComponent,
    ProfileContentCardComponent,
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
    TranslateModule.forChild(),
    ProfileRoutingModule,
  ],
  providers: [ProfileStoreService, ProfileService],
})
export class ProfileModule {}
