import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Roadmap } from "src/app/roadmap/store/roadmap.models";

@Component({
  selector: "app-profile-overview",
  templateUrl: "./profile-overview.component.html",
  styleUrls: ["./profile-overview.component.scss"],
})
export class ProfileOverviewComponent implements OnInit {
  public books = 0;
  public courses = 0;
  public degrees = 0;
  public tutorials = 0;

  @Input() roadmap: string;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.roadmap) this.getOverviewValues();
  }

  getOverviewValues() {
    // this.books = 0;
    // this.courses = 0;
    // this.degrees = 0;
    // this.tutorials = 0;
    // this.roadmap.books.forEach((item) => {
    //   if (item.endDate) this.books++;
    // });
    // this.roadmap.courses.forEach((item) => {
    //   if (item.endDate) this.courses++;
    // });
    // this.roadmap.degrees.forEach((item) => {
    //   if (item.endDate) this.degrees++;
    // });
    // this.roadmap.tutorials.forEach((item) => {
    //   if (item.endDate) this.tutorials++;
    // });
  }
}
