import { Component, OnInit, Input } from "@angular/core";
// import { Roadmap } from "src/app/roadmap/store/roadmap.models";

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

  // @Input() roadmap: Roadmap;

  constructor() {}

  ngOnInit(): void {
    this.getOverviewValues();
  }

  getOverviewValues() {
    // const roadmap = [
    //   ...this.roadmap.books,
    //   ...this.roadmap.courses,
    //   ...this.roadmap.degrees,
    //   ...this.roadmap.tutorials,
    // ];
    // roadmap.forEach((item: any) => {
    //   if (item.endDate) {
    //     switch (item.type) {
    //       case "book":
    //         this.books++;
    //         break;
    //       case "course":
    //         this.courses++;
    //         break;
    //       case "degree":
    //         this.degrees++;
    //         break;
    //       case "tutorial":
    //         this.tutorials++;
    //         break;
    //     }
    //   }
    // });
  }
}
