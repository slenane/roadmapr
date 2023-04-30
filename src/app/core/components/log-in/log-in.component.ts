import { Component, OnInit } from "@angular/core";
import { TokenPayload } from "src/app/core/store/auth.models";
import { AuthStoreService } from "../../services/auth-store.service";

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

  constructor(private authStoreService: AuthStoreService) {}

  ngOnInit(): void {}

  login() {
    this.authStoreService.login(this.credentials);
  }
}
