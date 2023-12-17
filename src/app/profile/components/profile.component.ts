import { Component, OnInit } from "@angular/core";
import { Profile } from "../store/profile.models";
import { ProfileStoreService } from "../services/profile-store.service";
import { filter, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { profileInitialState } from "../store/profile.reducer";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public isEditing: boolean = true;
  public user: Profile;

  constructor(private profileStoreService: ProfileStoreService) {}

  ngOnInit(): void {
    this.profileStoreService
      .getProfile()
      .pipe(
        filter((state) => state != null && state !== profileInitialState),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((user: Profile) => {
        this.user = user;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  toggleEditProfile() {
    this.isEditing = !this.isEditing;
  }
}
