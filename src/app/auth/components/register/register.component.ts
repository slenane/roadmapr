import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { AuthStoreService } from "src/app/auth/services/auth-store.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { UpdateUsernameComponent } from "src/app/shared/components/forms/update-username/update-username.component";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  public authUrl: string;
  public username: string = "";

  @Input() theme: string;

  @ViewChild("usernameUpdate") usernameUpdate: UpdateUsernameComponent;

  constructor(
    private authStoreService: AuthStoreService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getGithubAuthPage().subscribe({
      next: (data: any) => (this.authUrl = data["authUrl"]),
      error: (err: any) => console.log(err),
    });
  }

  register() {
    if (this.usernameUpdate.form.valid) {
      this.authStoreService.register({
        username: this.usernameUpdate.form.value.usernameCtrl,
      });
    }
  }

  registerWithGithub() {
    if (this.authUrl) {
      this.router.navigate(["/github-auth"], {
        queryParams: { url: this.authUrl },
      });
    }
  }
}
