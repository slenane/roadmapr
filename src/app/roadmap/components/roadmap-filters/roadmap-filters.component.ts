import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { RoadmapUpdateComponent } from "../roadmap-update/roadmap-update.component";

@Component({
  selector: "app-roadmap-filters",
  templateUrl: "./roadmap-filters.component.html",
  styleUrls: ["./roadmap-filters.component.scss"],
})
export class RoadmapFiltersComponent implements OnInit {
  public filters = [
    { title: "Books", type: "book" },
    { title: "Courses", type: "course" },
    { title: "Degrees", type: "degree" },
    { title: "Tutorials", type: "tutorial" },
  ];

  @Output() filterRoadmap: EventEmitter<null | string> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(RoadmapUpdateComponent, {
      width: "60vw",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed", result);
    });
  }
}
