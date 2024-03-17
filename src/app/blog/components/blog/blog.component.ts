import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { BlogItem } from "../../models/blog.models";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
})
export class BlogComponent implements OnInit {
  public currentYear: number;
  public userLanguage: "en" | "pt" | "es" = "en";
  public filteredBlogs: BlogItem[] = [];
  public searchTimeout: any;
  public blogItems: BlogItem[] = [
    {
      id: 0,
      title: "Why become a software developer?",
      blurb:
        "Working as a developer can be incredibly stressful, so why do so many people want to learn to code?",
      image: "assets/images/landing/sample2.png",
      content: "This is the content of the blog",
      author: "Stephen",
      authorImage: "assets/images/landing/blurry-image.jpg",
      date: "17 March 2024",
    },
    {
      id: 1,
      title: "5 Benefits of being a self-taught developer",
      blurb:
        "People often think you need a degree to be a successful developer, but self-taught developers are everywhere.",
      image: "assets/images/landing/sample2.png",
      content: "This is the content of the blog",
      author: "Stephen",
      authorImage: "assets/images/landing/blurry-image.jpg",
      date: "17 March 2024",
    },
    {
      id: 3,
      title: "How to learn to code for free in 2024",
      blurb:
        "Learning to code has never been as accessible, we show you how to become a developer completely for free.",
      image: "assets/images/landing/sample2.png",
      content: "This is the content of the blog",
      author: "Stephen",
      authorImage: "assets/images/landing/blurry-image.jpg",
      date: "17 March 2024",
    },
  ];

  @ViewChild("search") search: ElementRef;

  constructor(
    private translateService: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filteredBlogs = this.blogItems;
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

  filterBlogs(event: KeyboardEvent) {
    const value: string = (event.target as HTMLInputElement).value;

    if (!value) {
      this.filteredBlogs = this.blogItems;
      return;
    }

    if (this.searchTimeout) clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.filteredBlogs = this.blogItems.filter(
        (blog: BlogItem) =>
          blog?.title.toLowerCase().includes(value.toLowerCase()) ||
          blog?.blurb.toLowerCase().includes(value.toLowerCase()) ||
          blog?.author.toLowerCase().includes(value.toLowerCase())
      );
    }, 600);
  }

  clearFilter() {
    this.filteredBlogs = this.blogItems;
    this.search.nativeElement.value = "";
  }

  openBlog(id: number) {
    this.router.navigate(["/blog", id]);
  }
}
