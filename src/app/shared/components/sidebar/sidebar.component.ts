import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { SIDEBAR_OPTIONS } from "src/app/shared/constants/sidebar.constants";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public options = SIDEBAR_OPTIONS;
  public navbarCollapsed: boolean = true;
  public displayLargeLogo: boolean = false;

  @Output() onCollapseNavbar: EventEmitter<boolean> = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  collapseNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;
    this.onCollapseNavbar.emit(this.navbarCollapsed);
    if (this.navbarCollapsed) this.displayLargeLogo = false;
    else setTimeout(() => (this.displayLargeLogo = true), 200); // Make transition smoother
  }

  logout(): void {
    this.authService.logout();
  }
}
