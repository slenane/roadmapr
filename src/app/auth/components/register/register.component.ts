import { Component, OnInit, Input } from "@angular/core";
import { AuthStoreService } from "src/app/auth/services/auth-store.service";
import { TokenPayload } from "src/app/auth/store/auth.models";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  public authUrl: string;
  userDetails: TokenPayload = {
    email: "",
    name: "",
    password: "",
    username: "",
  };

  @Input() theme: string;

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
    this.authStoreService.register(this.userDetails);
  }

  registerWithGithub() {
    if (this.authUrl) {
      this.router.navigate(["/github-auth"], {
        queryParams: { url: this.authUrl },
      });
    }
  }
}
