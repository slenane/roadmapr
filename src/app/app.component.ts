import { Component, OnInit } from "@angular/core";
import { AuthService } from "./core/services//auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public authenticated$: Observable<boolean>;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authenticated$ = this.authService.isAuthenticated;
  }
}
