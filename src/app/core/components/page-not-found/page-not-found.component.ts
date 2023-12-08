import { Component, OnInit } from "@angular/core";
import { ThemeService } from "../../services/theme.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrls: ["./page-not-found.component.scss"],
})
export class PageNotFoundComponent implements OnInit {
  public theme$: Observable<string>;
  public currentTheme: string;

  constructor(private themeService: ThemeService) {
    this.theme$ = this.themeService.selectedTheme;
  }

  ngOnInit(): void {
    this.theme$.subscribe((theme: string) => {
      this.currentTheme = theme;
    });
  }
}
