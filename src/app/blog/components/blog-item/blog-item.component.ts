import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { BlogItem } from "../../models/blog.models";

@Component({
  selector: "app-blog-item",
  templateUrl: "./blog-item.component.html",
  styleUrls: ["./blog-item.component.scss"],
})
export class BlogItemComponent implements OnInit {
  public currentYear: number;
  public userLanguage: "en" | "pt" | "es" = "en";
  public blog: BlogItem = {
    id: 0,
    title: "Why become a software developer?",
    blurb:
      "Working as a developer can be incredibly stressful, so why do so many people want to learn to code?",
    image: "assets/images/landing/sample2.png",
    content: "This is the content of the blog",
    author: "Stephen",
    authorImage: "assets/images/landing/blurry-image.jpg",
    date: "17 March 2024",
    category: "#self-taught",
    tags: ["#learn-to-code", "#career"],
  };

  constructor(
    private translateService: TranslateService,
    private router: Router
  ) {}

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
