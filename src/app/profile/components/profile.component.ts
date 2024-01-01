import { Component, OnInit } from "@angular/core";
import { Profile } from "../store/profile.models";
import { ProfileStoreService } from "../services/profile-store.service";
import { filter, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { profileInitialState } from "../store/profile.reducer";
import { MEDIA_QUERIES } from "src/app/shared/constants/breakpoints.constants";
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public isMobileDevice = false;
  public isEditing: boolean = false;
  public user: Profile;

  constructor(
    private profileStoreService: ProfileStoreService,
    private breakpointObserver: BreakpointObserver
  ) {}

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

    this.breakpointObserver
      .observe(MEDIA_QUERIES.BREAKPOINTS)
      .subscribe((result) => {
        this.isMobileDevice = MEDIA_QUERIES.MOBILE.find(
          (size) => result.breakpoints[size]
        )
          ? true
          : false;
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
