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
import { ImageCropperModalComponent } from "./components/image-cropper-modal/image-cropper-modal.component";
import { ImageCropperModule } from "ngx-image-cropper";
import { AlertsComponent } from "./components/alerts/alerts.component";
import { AlertsService } from "./services/alerts.service";
import { FileUploadProfileImageComponent } from "./components/file-upload/file-upload-profile-image/file-upload-profile-image.component";
import { FileUploadCoverImageComponent } from "./components/file-upload/file-upload-cover-image/file-upload-cover-image.component";

@NgModule({
  declarations: [
    SidebarComponent,
    StackSelectorComponent,
    DropListFiltersComponent,
    IconCardComponent,
    UpdatePasswordComponent,
    UpdateUsernameComponent,
    UpdateEmailComponent,
    ImageCropperModalComponent,
    AlertsComponent,
    FileUploadProfileImageComponent,
    FileUploadCoverImageComponent,
  ],
  exports: [
    SidebarComponent,
    StackSelectorComponent,
    DropListFiltersComponent,
    IconCardComponent,
    UpdatePasswordComponent,
    UpdateUsernameComponent,
    UpdateEmailComponent,
    FileUploadProfileImageComponent,
    FileUploadCoverImageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forChild(),
    ImageCropperModule,
  ],
  providers: [
    DropListService,
    ValidatorsService,
    MyErrorStateMatcher,
    AlertsService,
  ],
})
export class SharedModule {}
