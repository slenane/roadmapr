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
  public demoUsers: any[] = [
    {
      firstName: "Juan Martín",
      lastName: "González López",
      profileImage: "assets/images/landing/juan.jpg",
      coverImage: "assets/images/landing/green1.jpg",
      path: {
        id: 1,
        name: "PATHS.TITLES.BACKEND",
      },
      location: {
        id: "AR",
        name: "COUNTRIES.AR",
      },
      nationality: {
        id: "AR",
        name: "COUNTRIES.AR",
      },
    },
    {
      firstName: "Manuela",
      lastName: "Lima",
      profileImage: "assets/images/landing/manuela.jpg",
      coverImage: "assets/images/landing/green2.jpg",
      path: {
        id: 0,
        name: "PATHS.TITLES.FRONTEND",
      },
      location: {
        id: "PT",
        name: "COUNTRIES.PT",
      },
    },
    {
      firstName: "Eli",
      lastName: "Everett",
      profileImage: "assets/images/landing/eli.jpg",
      coverImage: "assets/images/landing/OBTQ.jpg",
      path: {
        id: 2,
        name: "PATHS.TITLES.FULL_STACK",
      },
      location: {
        id: "US",
        name: "COUNTRIES.US",
      },
    },
  ];

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
