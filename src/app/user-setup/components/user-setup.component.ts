import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UserSetupBasicDetailsComponent } from "./user-setup-basic-details/user-setup-basic-details.component";
import { Profile } from "src/app/profile/store/profile.models";
import { filter, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { ProfileStoreService } from "src/app/profile/services/profile-store.service";
import { Router } from "@angular/router";
import { ProfileService } from "src/app/profile/services/profile.service";
import { ROUTES } from "src/app/core/constants/routes.constants";

@Component({
  selector: "app-user-setup",
  templateUrl: "./user-setup.component.html",
  styleUrls: ["./user-setup.component.scss"],
})
export class UserSetupComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public user: any;
  public userSetupInitialised: boolean = false;

  constructor(
    public dialog: MatDialog,
    private profileStoreService: ProfileStoreService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileStoreService
      .getProfile()
      .pipe(
        filter((state) => state != null),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((user: Profile) => {
        if (!this.userSetupInitialised && user._id) {
          this.user = user;
          if (!this.profileService.userBasicDetailsProvided(user)) {
            this.displayWelcomeSteps(user);
          } else {
            this.router.navigate([ROUTES.DASHBOARD]);
          }
        }
      });
  }

  displayWelcomeSteps(user: any) {
    const dialogRef = this.dialog.open(UserSetupBasicDetailsComponent, {
      width: "50vw",
      data: {
        profileImage: user.profileImage,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        nationality: user.nationality,
        path: user.path,
      },
      disableClose: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((user) => {
      if (user) {
        this.userSetupInitialised = true;
        this.profileStoreService.updateProfile(this.user._id, user.data);

        if (user.action === "skip") this.router.navigateByUrl(ROUTES.DASHBOARD);
        else this.router.navigateByUrl(ROUTES.TOUR);
      }
    });
  }
}
