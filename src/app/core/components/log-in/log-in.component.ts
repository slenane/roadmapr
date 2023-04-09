import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { TokenPayload } from "src/app/core/store/auth.models";
import { Router } from "@angular/router";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.scss"],
})
export class LogInComponent implements OnInit {
  credentials: TokenPayload = {
    email: "",
    password: "",
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.authService.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl("/profile");
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
