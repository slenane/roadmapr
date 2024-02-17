import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-privacy-policy",
  templateUrl: "./privacy-policy.component.html",
  styleUrls: ["./privacy-policy.component.scss"],
})
export class PrivacyPolicyComponent implements OnInit {
  public scrolling = false;

  @ViewChild("landing") landing: ElementRef;

  constructor() {}

  ngOnInit(): void {}

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
