import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { Profile } from "../../store/profile.models";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProfileStoreService } from "../../services/profile-store.service";
import { DEV_PATHS } from "src/app/shared/constants/dev-paths.constants";

@Component({
  selector: "app-profile-edit",
  templateUrl: "./profile-edit.component.html",
  styleUrls: ["./profile-edit.component.scss"],
})
export class ProfileEditComponent implements OnInit {
  public paths = DEV_PATHS;

  public profileForm = new FormGroup({
    bio: new FormControl(""),
    coverImage: new FormControl(""),
    cv: new FormControl(""),
    github: new FormControl(""),
    linkedin: new FormControl(""),
    location: new FormControl("", Validators.required),
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    nationality: new FormControl("", Validators.required),
    profileImage: new FormControl(""),
    path: new FormControl("", Validators.required),
    twitter: new FormControl(""),
    username: new FormControl("", Validators.required),
  });

  @Input() user: Profile;
  @Input() userId: string;
  @Output() editProfile: EventEmitter<any> = new EventEmitter();

  @ViewChild("location") location: ElementRef;
  @ViewChild("firstName") firstName: ElementRef;
  @ViewChild("lastName") lastName: ElementRef;
  @ViewChild("nationality") nationality: ElementRef;
  @ViewChild("path") path: ElementRef;
  @ViewChild("username") username: ElementRef;

  constructor(private profileStoreService: ProfileStoreService) {}

  ngOnInit(): void {
    this.setEditProfileForm(this.user);
  }

  setEditProfileForm(user: any) {
    this.profileForm.patchValue({
      bio: user.bio,
      coverImage: user.coverImage,
      cv: user.links.cv,
      github: user.links.github,
      linkedin: user.links.linkedin,
      location: user.location,
      firstName: user.firstName,
      lastName: user.lastName,
      nationality: user.nationality,
      profileImage: user.profileImage,
      path: user.path,
      twitter: user.links.twitter,
      username: user.username,
    });
  }

  uploadImage($event: any) {
    console.log($event);
  }

  onCancel() {
    this.editProfile.emit(false);
  }

  onSave() {
    this.profileStoreService.updateProfile(this.user._id, {
      ...this.profileForm.value,
    });
    this.editProfile.emit(false);
  }
}
