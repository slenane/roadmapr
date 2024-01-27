import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  public scrolling = false;
  public currentYear: number;
  public userLanguage: "en" | "pt" | "es" = "en";

  @ViewChild("landing") landing: ElementRef;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.setUserLanguage();
  }

  ngAfterViewInit() {
    if (this.landing) {
      this.landing.nativeElement.addEventListener(
        "scroll",
        this.onScroll.bind(this)
      );
    }
  }

  setUserLanguage() {
    const browserLanguage = navigator.language.split("-")[0];
    this.userLanguage =
      browserLanguage === "es" || browserLanguage === "pt"
        ? browserLanguage
        : "en";

    this.translateService.use(this.userLanguage);
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    this.scrolling = target.scrollTop > 64;
  }
}
