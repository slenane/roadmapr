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
import { DEV_ROLES } from "../../constants/profile.constants";

@Component({
  selector: "app-profile-edit",
  templateUrl: "./profile-edit.component.html",
  styleUrls: ["./profile-edit.component.scss"],
})
export class ProfileEditComponent implements OnInit {
  public roles = DEV_ROLES;

  public profileForm = new FormGroup({
    bio: new FormControl(""),
    coverImage: new FormControl(""),
    cv: new FormControl(""),
    email: new FormControl("", Validators.required),
    github: new FormControl(""),
    linkedIn: new FormControl(""),
    location: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    nationality: new FormControl("", Validators.required),
    profileImage: new FormControl(""),
    role: new FormControl("", Validators.required),
    twitter: new FormControl(""),
    username: new FormControl("", Validators.required),
  });

  @Input() user: Profile;
  @Input() userId: string;
  @Output() editProfile: EventEmitter<any> = new EventEmitter();

  @ViewChild("email") email: ElementRef;
  @ViewChild("location") location: ElementRef;
  @ViewChild("name") name: ElementRef;
  @ViewChild("nationality") nationality: ElementRef;
  @ViewChild("role") role: ElementRef;
  @ViewChild("username") username: ElementRef;

  constructor(private profileStoreService: ProfileStoreService) {}

  ngOnInit(): void {
    this.setEditProfileForm(this.user);
  }

  setEditProfileForm(user: any) {
    this.profileForm.patchValue({
      bio: user.bio,
      coverImage: user.coverImage,
      cv: user.cv,
      email: user.email,
      github: user.github,
      linkedIn: user.linkedIn,
      location: user.location,
      name: user.name,
      nationality: user.nationality,
      profileImage: user.profileImage,
      role: user.role,
      twitter: user.twitter,
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
    this.profileStoreService.updateProfile(this.userId, {
      ...this.profileForm.value,
    });
    this.editProfile.emit(false);
  }
}
