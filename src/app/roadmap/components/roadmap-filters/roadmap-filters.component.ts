import { Component, EventEmitter, OnInit, Output, Input } from "@angular/core";
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

  @Input() roadmapId: string;
  @Output() filterRoadmap: EventEmitter<null | string> = new EventEmitter();
  @Output() updateRoadmap: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  addItem(): void {
    const dialogRef = this.dialog.open(RoadmapUpdateComponent, {
      width: "60vw",
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.updateRoadmap.emit({ id: this.roadmapId, data: result });
    });
  }
}
