import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  public currentYear: number;
  public userLanguage: "en" | "pt" | "es" = "en";

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.setUserLanguage();
  }

  setUserLanguage() {
    const browserLanguage = navigator.language.split("-")[0];
    this.userLanguage =
      browserLanguage === "es" || browserLanguage === "pt"
        ? browserLanguage
        : "en";

    this.translateService.use(this.userLanguage);
  }
}
