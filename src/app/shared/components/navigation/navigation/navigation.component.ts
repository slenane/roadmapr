import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";
import { AuthStoreService } from "src/app/auth/services/auth-store.service";
import { ThemeService } from "src/app/core/services/theme.service";
import { NAVIGATION_OPTIONS } from "src/app/shared/constants/navigation.constants";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
  public theme$: Observable<"light" | "dark" | undefined>;
  public options = NAVIGATION_OPTIONS;
  public currentTheme: "light" | "dark" | undefined;
  public navbarCollapsed: boolean = true;
  public displayLargeLogo: boolean = false;

  @Output() onCollapseNavbar: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authStoreService: AuthStoreService,
    private themeService: ThemeService
  ) {
    this.theme$ = this.themeService.selectedTheme;
  }

  ngOnInit(): void {
    this.theme$.subscribe((theme: "light" | "dark" | undefined) => {
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
    this.authStoreService.logout();
  }
}
