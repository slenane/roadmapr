import { Component, OnInit } from "@angular/core";
import { Profile } from "../store/profile.models";
import { ProfileStoreService } from "../services/profile-store.service";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  public user: Profile;
  public userId: string = "6434207863105b3b3fe7cd91";

  constructor(private profileStoreService: ProfileStoreService) {}

  ngOnInit(): void {
    this.profileStoreService
      .getProfile(this.userId)
      .pipe(filter((state) => state != null))
      .subscribe((user: Profile) => {
        console.log(user);
        this.user = user;
      });

    // this.authService.getProfile().subscribe({
    //   next: (user) => {
    //     this.user = user;
    //   },
    //   error: (err) => console.error(err),
    // });
  }
}
