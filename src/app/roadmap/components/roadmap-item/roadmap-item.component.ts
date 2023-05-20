import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { RoadmapItemDetailsComponent } from "./roadmap-item-details/roadmap-item-details.component";

@Component({
  selector: "app-roadmap-item",
  templateUrl: "./roadmap-item.component.html",
  styleUrls: ["./roadmap-item.component.scss"],
})
export class RoadmapItemComponent implements OnInit {
  @Input() data: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  removeRecommendation(item: any) {
    console.log(item);
  }

  openItemDetails() {
    this.dialog.open(RoadmapItemDetailsComponent, {
      width: "60vw",
      data: this.data,
    });
  }
}
