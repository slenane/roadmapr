import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { ThemeService } from "src/app/core/services/theme.service";
import { SIDEBAR_OPTIONS } from "src/app/shared/constants/sidebar.constants";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public theme$: Observable<string>;
  public options = SIDEBAR_OPTIONS;
  public currentTheme: string;
  public navbarCollapsed: boolean = true;
  public displayLargeLogo: boolean = false;

  @Output() onCollapseNavbar: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.theme$ = this.themeService.selectedTheme;
  }

  ngOnInit(): void {
    this.theme$.subscribe((theme: string) => {
      this.currentTheme = theme;
    });
  }

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
