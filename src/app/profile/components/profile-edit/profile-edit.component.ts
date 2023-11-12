import {
  Component,
  EventEmitter,
  OnInit,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { Profile } from "src/app/profile/store/profile.models";
import { ProfileStoreService } from "../../services/profile-store.service";
import { ProfileEditBasicInfoComponent } from "./profile-edit-basic-info/profile-edit-basic-info.component";
import { ProfileEditLanguagesComponent } from "./profile-edit-languages/profile-edit-languages.component";
import { ProfileEditSocialComponent } from "./profile-edit-social/profile-edit-social.component";
import { ProfileEditEducationComponent } from "./profile-edit-education/profile-edit-education.component";
import { ProfileEditInterestsComponent } from "./profile-edit-interests/profile-edit-interests.component";
import { MatTabGroup } from "@angular/material/tabs";
import { AlertsService } from "src/app/shared/services/alerts.service";

@Component({
  selector: "app-profile-edit",
  templateUrl: "./profile-edit.component.html",
  styleUrls: ["./profile-edit.component.scss"],
})
export class ProfileEditComponent implements OnInit {
  @Input() user: Profile;
  @Input() userId: string;
  @Output() editProfile: EventEmitter<any> = new EventEmitter();

  @ViewChild("basicInfo") basicInfo: ProfileEditBasicInfoComponent;
  @ViewChild("languages") languages: ProfileEditLanguagesComponent;
  @ViewChild("social") social: ProfileEditSocialComponent;
  @ViewChild("education") education: ProfileEditEducationComponent;
  @ViewChild("interests") interests: ProfileEditInterestsComponent;
  @ViewChild("tabGroup") tabGroup: MatTabGroup;

  constructor(
    private profileStoreService: ProfileStoreService,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {}

  onCancel() {
    this.editProfile.emit(false);
  }

  isFormValid(): boolean {
    return (
      this.basicInfo.form.valid &&
      this.languages.form.valid &&
      this.social.form.valid &&
      this.education.form.valid &&
      this.interests.form.valid
    );
  }

  onSave() {
    if (!this.isFormValid()) {
      const socialFormError = this.social.focusErrorInput();
      const basicFormError = this.basicInfo.focusErrorInput();

      if (basicFormError || socialFormError) {
        this.tabGroup.selectedIndex = 0;
        this.alertsService.errorAlert("PROFILE.UPDATE.MISSING_FIELDS");
        return;
      }
    }

    this.profileStoreService.updateProfile(this.user._id, {
      bio: this.basicInfo.form.value.bioCtrl,
      links: {
        cv: this.social.form.value.cvCtrl,
        linkedIn: this.social.form.value.linkedInCtrl,
        x: this.social.form.value.xCtrl,
        portfolio: this.social.form.value.portfolioCtrl,
      },
      interests: {
        personalInterests: this.interests.form.value.personalCtrl,
        professionalInterests: this.interests.form.value.professionalCtrl,
      },
      languagesSpoken: this.languages.form.value.languagesCtrl,
      location: this.basicInfo.form.value.locationCtrl,
      firstName: this.basicInfo.form.value.firstNameCtrl,
      lastName: this.basicInfo.form.value.lastNameCtrl,
      nationality: this.basicInfo.form.value.nationalityCtrl,
      path: this.basicInfo.form.value.pathCtrl,
      previousEducation: this.education.form.value.previousEducationCtrl,
    });
    this.editProfile.emit(false);
  }
}
