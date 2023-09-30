import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { UserSetupComponent } from "./components//user-setup.component";
import { UserSSetupRoutingModule } from "./user-setup-routing.module";
import { UserSetupBasicDetailsComponent } from './components/user-setup-basic-details/user-setup-basic-details.component';
import { UserSetupPathComponent } from './components/user-setup-path/user-setup-path.component';
import { UserSetupTourComponent } from './components/user-setup-tour/user-setup-tour.component';

@NgModule({
  declarations: [UserSetupComponent, UserSetupBasicDetailsComponent, UserSetupPathComponent, UserSetupTourComponent],
  exports: [],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forChild(),
    UserSSetupRoutingModule,
  ],
  providers: [],
})
export class UserSetupModule {}
