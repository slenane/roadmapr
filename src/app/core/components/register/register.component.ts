import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { TokenPayload } from "src/app/core/store/auth.models";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  credentials: TokenPayload = {
    email: "",
    name: "",
    password: "",
    username: "",
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    this.authService.register(this.credentials).subscribe(
      (res) => {
        console.log(res);
        this.router.navigateByUrl("/profile");
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
