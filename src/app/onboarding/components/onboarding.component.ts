import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { OnboardingBasicDetailsComponent } from "./onboarding-basic-details/onboarding-basic-details.component";
import { Profile } from "src/app/profile/store/profile.models";
import { filter, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { ProfileStoreService } from "src/app/profile/services/profile-store.service";
import { Router } from "@angular/router";
import { ProfileService } from "src/app/profile/services/profile.service";
import { ROUTES } from "src/app/core/constants/routes.constants";
import { profileInitialState } from "src/app/profile/store/profile.reducer";
import { RoadmapStoreService } from "src/app/roadmap/services/roadmap-store.service";

@Component({
  selector: "app-onboarding",
  templateUrl: "./onboarding.component.html",
  styleUrls: ["./onboarding.component.scss"],
})
export class OnboardingComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public user: any;
  public onboardingInitialised: boolean = false;

  constructor(
    public dialog: MatDialog,
    private profileStoreService: ProfileStoreService,
    private profileService: ProfileService,
    private roadmapStoreService: RoadmapStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileStoreService
      .getProfile()
      .pipe(
        filter((state) => state != profileInitialState),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((user: Profile) => {
        if (!this.onboardingInitialised && user._id) {
          this.user = user;
          if (!this.profileService.userBasicDetailsProvided(user)) {
            this.displayOnboardingSteps(user);
          } else {
            this.router.navigate([ROUTES.ROADMAP]);
          }
        }
      });
  }

  displayOnboardingSteps(user: any) {
    const dialogRef = this.dialog.open(OnboardingBasicDetailsComponent, {
      panelClass: "modal-class",
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
        this.onboardingInitialised = true;
        this.profileStoreService.updateProfile(this.user._id, user.data);
        this.roadmapStoreService.updateRoadmap({
          path: user.data.path,
        });

        this.router.navigateByUrl(ROUTES.ROADMAP);
      }
    });
  }
}
