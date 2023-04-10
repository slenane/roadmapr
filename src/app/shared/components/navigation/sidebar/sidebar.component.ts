import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { SIDEBAR_OPTIONS } from "src/app/shared/constants/sidebar.constants";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public options = SIDEBAR_OPTIONS;
  public user: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (user) => (this.user = user),
      error: (err) => console.error(err),
    });
  }
}
