import { Component, OnInit } from "@angular/core";
import { AuthStoreService } from "src/app/core/services/auth-store.service";
import { TokenPayload } from "src/app/core/store/auth.models";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  userDetails: TokenPayload = {
    email: "",
    name: "",
    password: "",
    username: "",
  };

  constructor(private authStoreService: AuthStoreService) {}

  ngOnInit(): void {}

  register() {
    this.authStoreService.register(this.userDetails);
  }
}
