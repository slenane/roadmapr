import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { ProfileComponent } from "./components/profile.component";
import { ProfileOverviewComponent } from "./components/profile-overview/profile-overview.component";
import { ProfileSkillsComponent } from "./components/profile-skills/profile-skills.component";
import { ProfileInfoComponent } from "./components/profile-info/profile-info.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "../core/core.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileOverviewComponent,
    ProfileSkillsComponent,
    ProfileInfoComponent,
  ],
  exports: [
    ProfileComponent,
    ProfileOverviewComponent,
    ProfileSkillsComponent,
    ProfileInfoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
  ],
})
export class ProfileModule {}
