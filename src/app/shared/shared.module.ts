import { NgModule } from "@angular/core";
import { NavigationComponent } from "./components/navigation/navigation/navigation.component";
import { StackSelectorComponent } from "./components/stack-selector/stack-selector.component";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { DropListFiltersComponent } from "./components/drop-list/drop-list-filters/drop-list-filters.component";
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
import { LoadingComponent } from "./components/loading/loading.component";
import { NgScrollbarModule } from "ngx-scrollbar";
import { UpdatePasswordInputsComponent } from "./components/forms/update-password/update-password-inputs/update-password-inputs.component";
import { DropListEmptyComponent } from "./components/drop-list/drop-list-empty/drop-list-empty.component";
import { PathSelectorComponent } from "./components/path-selector/path-selector.component";
import { DropListDateComponent } from "./components/drop-list/drop-list-date/drop-list-date.component";
import { MobileNavigationComponent } from "./components/navigation/mobile-navigation/mobile-navigation.component";
import { DropListFilterItemsComponent } from "./components/drop-list/drop-list-filters/drop-list-filter-items/drop-list-filter-items.component";
import { LogoComponent } from "./components/logo/logo.component";
import { HomeNavigationComponent } from "./components/navigation/home-navigation/home-navigation.component";

@NgModule({
  declarations: [
    NavigationComponent,
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
    LoadingComponent,
    UpdatePasswordInputsComponent,
    DropListEmptyComponent,
    PathSelectorComponent,
    DropListDateComponent,
    MobileNavigationComponent,
    DropListFilterItemsComponent,
    LogoComponent,
    HomeNavigationComponent,
  ],
  exports: [
    NavigationComponent,
    StackSelectorComponent,
    DropListFiltersComponent,
    IconCardComponent,
    UpdatePasswordComponent,
    UpdateUsernameComponent,
    UpdateEmailComponent,
    FileUploadProfileImageComponent,
    FileUploadCoverImageComponent,
    LoadingComponent,
    NgScrollbarModule,
    UpdatePasswordInputsComponent,
    DropListEmptyComponent,
    MobileNavigationComponent,
    DropListFilterItemsComponent,
    LogoComponent,
    HomeNavigationComponent,
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
