import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.service";
import { SettingsStoreService } from "../../services/settings-store.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-settings-github",
  templateUrl: "./settings-github.component.html",
  styleUrls: ["./settings-github.component.scss"],
})
export class SettingsGithubComponent implements OnInit {
  public githubAuthUrl: string;

  @Input() userId: string;
  @Input() github: any;

  constructor(
    private authService: AuthService,
    private settingsStoreService: SettingsStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getGithubAuthPage().subscribe({
      next: (data: any) => (this.githubAuthUrl = data["authUrl"]),
      error: (err: any) => console.log(err),
    });
  }

  linkGithubAccount(): void {
    if (this.githubAuthUrl) {
      this.router.navigate(["/github-auth"], {
        queryParams: { url: this.githubAuthUrl },
      });
    }
  }

  removeGithubAccount(): void {
    this.settingsStoreService.updateSettings(this.userId, {
      github: {
        id: "",
        username: "",
      },
    });
  }
}
