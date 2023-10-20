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

  constructor(private profileStoreService: ProfileStoreService) {}

  ngOnInit(): void {}

  onCancel() {
    this.editProfile.emit(false);
  }

  onSave() {
    console.log("basic info", this.basicInfo.form.valid);
    console.log("languages", this.languages.form.valid);
    console.log("social", this.social.form.valid);
    console.log("education", this.education.form.valid);
    console.log("interests", this.interests.form.valid);
    console.log({
      bio: this.basicInfo.form.value.bioCtrl,
      links: {
        cv: this.social.form.value.cvCtrl,
        linkedin: this.social.form.value.linkedinCtrl,
        twitter: this.social.form.value.xCtrl,
        portfolio: this.social.form.value.portfolioCtrl,
      },
      interests: {
        personal_interests: this.interests.form.value.personalCtrl,
        professional_interests: this.interests.form.value.professionalCtrl,
      },
      languagesSpoken: this.languages.form.value.languagesCtrl,
      location: this.basicInfo.form.value.locationCtrl,
      firstName: this.basicInfo.form.value.firstNameCtrl,
      lastName: this.basicInfo.form.value.lastNameCtrl,
      nationality: this.basicInfo.form.value.nationalityCtrl,
      path: this.basicInfo.form.value.pathCtrl,
      previousEducation: this.education.form.value.previousEducationCtrl,
    });

    return;
    this.profileStoreService.updateProfile(this.user._id, {
      bio: this.basicInfo.form.value.bioCtrl,
      links: {
        cv: this.social.form.value.cvCtrl,
        linkedin: this.social.form.value.linkedinCtrl,
        twitter: this.social.form.value.xCtrl,
        portfolio: this.social.form.value.portfolioCtrl,
      },
      interests: {
        personal_interests: this.interests.form.value.personalCtrl,
        professional_interests: this.interests.form.value.professionalCtrl,
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
