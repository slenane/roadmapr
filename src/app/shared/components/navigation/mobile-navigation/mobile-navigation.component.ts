import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { AuthStoreService } from "src/app/auth/services/auth-store.service";
import { ThemeService } from "src/app/core/services/theme.service";
import { NAVIGATION_OPTIONS } from "src/app/shared/constants/navigation.constants";

@Component({
  selector: "app-mobile-navigation",
  templateUrl: "./mobile-navigation.component.html",
  styleUrls: ["./mobile-navigation.component.scss"],
})
export class MobileNavigationComponent implements OnInit {
  public theme$: Observable<string>;
  public currentTheme: string;
  public options = NAVIGATION_OPTIONS;
  public opened: boolean;
  public menuTimeout: any;
  public closed = true;

  @ViewChild("drawer") drawer: any;

  constructor(
    private authStoreService: AuthStoreService,
    private themeService: ThemeService
  ) {
    this.theme$ = this.themeService.selectedTheme;
  }

  ngOnInit(): void {
    this.theme$.subscribe((theme: string) => {
      this.currentTheme = theme;
    });
  }

  logout(): void {
    this.authStoreService.logout();
  }

  toggleMenu() {
    clearTimeout(this.menuTimeout);

    this.drawer.toggle();

    if (this.opened) {
      this.menuTimeout = setTimeout(() => (this.closed = true), 300);
    } else {
      this.closed = false;
    }
  }
}
