import { Component, OnInit } from "@angular/core";
import { Profile } from "../store/profile.models";
import { ProfileStoreService } from "../services/profile-store.service";
import { filter, takeUntil } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as authSelectors from "src/app/core/store/auth.selectors";
import { Subject } from "rxjs";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public user: Profile;
  public userId: any;
  public isEditing: boolean = false;

  constructor(
    private profileStoreService: ProfileStoreService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store
      .select(authSelectors.getUserId)
      .pipe(
        filter((data) => !!data),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((id) => {
        this.userId = id;

        this.profileStoreService
          .getProfile(this.userId)
          .pipe(filter((state) => state != null))
          .subscribe((user: Profile) => {
            this.user = user;
          });
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  editProfile(value: boolean) {
    this.isEditing = value;
  }
}
