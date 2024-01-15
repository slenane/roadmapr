import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  public scrolling = false;
  public currentYear: number;

  @ViewChild("landing") landing: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

  ngAfterViewInit() {
    if (this.landing) {
      this.landing.nativeElement.addEventListener(
        "scroll",
        this.onScroll.bind(this)
      );
    }
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    this.scrolling = target.scrollTop > 64;
  }
}
