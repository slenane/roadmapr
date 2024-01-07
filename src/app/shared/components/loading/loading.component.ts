import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ThemeService } from "src/app/core/services/theme.service";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"],
})
export class LoadingComponent implements OnInit {
  public theme$: Observable<"light" | "dark" | undefined>;
  public currentTheme: "light" | "dark" | undefined;

  constructor(private themeService: ThemeService) {
    this.theme$ = this.themeService.selectedTheme;
  }

  ngOnInit(): void {
    this.theme$.subscribe((theme: "light" | "dark" | undefined) => {
      this.currentTheme = theme;
    });
  }
}
