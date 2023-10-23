import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ThemeService } from "src/app/core/services/theme.service";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"],
})
export class LoadingComponent implements OnInit {
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
