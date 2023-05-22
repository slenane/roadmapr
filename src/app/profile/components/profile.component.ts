import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Profile } from "../store/profile.models";
import { ProfileStoreService } from "../services/profile-store.service";
import { filter } from "rxjs/operators";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  public user: Profile;
  public userId: string = "6434207863105b3b3fe7cd91";
  public isEditing: boolean = false;
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
    summary: new FormControl("", Validators.required),
    twitter: new FormControl(""),
    username: new FormControl("", Validators.required),
  });

  @ViewChild("email") email: ElementRef;
  @ViewChild("location") location: ElementRef;
  @ViewChild("name") name: ElementRef;
  @ViewChild("nationality") nationality: ElementRef;
  @ViewChild("summary") summary: ElementRef;
  @ViewChild("username") username: ElementRef;

  constructor(private profileStoreService: ProfileStoreService) {}

  ngOnInit(): void {
    this.profileStoreService
      .getProfile(this.userId)
      .pipe(filter((state) => state != null))
      .subscribe((user: Profile) => {
        console.log(user);
        this.user = user;
      });
  }

  editProfile() {
    this.profileForm.patchValue({
      bio: this.user.bio,
      coverImage: this.user.coverImage,
      cv: this.user.cv,
      email: this.user.email,
      github: this.user.github,
      linkedIn: this.user.linkedIn,
      location: this.user.location,
      name: this.user.name,
      nationality: this.user.nationality,
      profileImage: this.user.profileImage,
      summary: this.user.summary,
      twitter: this.user.twitter,
      username: this.user.username,
    });
    this.isEditing = true;
  }

  onCancel() {
    this.profileForm.reset();
    this.isEditing = false;
  }

  onSave() {
    this.profileStoreService.updateProfile(this.userId, {
      ...this.profileForm.value,
    });
    this.isEditing = false;
  }
}
