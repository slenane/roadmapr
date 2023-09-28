import { NgModule } from "@angular/core";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { StackSelectorComponent } from "./components/stack-selector/stack-selector.component";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { DropListFiltersComponent } from "./components/drop-list-filters/drop-list-filters.component";
import { IconCardComponent } from "./components/icon-card/icon-card.component";
import { TranslateModule } from "@ngx-translate/core";
import { UpdatePasswordComponent } from "./components/forms/update-password/update-password.component";
import { UpdateUsernameComponent } from "./components/forms/update-username/update-username.component";
import { UpdateEmailComponent } from "./components/forms/update-email/update-email.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { DropListService } from "./services/drop-list.service";
import { ValidatorsService } from "./services/validators.service";
import { MyErrorStateMatcher } from "./services/error-state-matcher.service";

@NgModule({
  declarations: [
    SidebarComponent,
    StackSelectorComponent,
    DropListFiltersComponent,
    IconCardComponent,
    UpdatePasswordComponent,
    UpdateUsernameComponent,
    UpdateEmailComponent,
  ],
  exports: [
    SidebarComponent,
    StackSelectorComponent,
    DropListFiltersComponent,
    IconCardComponent,
    UpdatePasswordComponent,
    UpdateUsernameComponent,
    UpdateEmailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forChild(),
  ],
  providers: [DropListService, ValidatorsService, MyErrorStateMatcher],
})
export class SharedModule {}
