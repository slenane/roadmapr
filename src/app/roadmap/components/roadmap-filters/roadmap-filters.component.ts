import { Component, EventEmitter, OnInit, Output, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { RoadmapUpdateComponent } from "../roadmap-update/roadmap-update.component";
import { RoadmapService } from "../../services/roadmap.service";

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

  constructor(
    public dialog: MatDialog,
    private roadmapService: RoadmapService
  ) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(RoadmapUpdateComponent, {
      width: "60vw",
    });

    dialogRef.afterClosed().subscribe((result) => {
      const topics = result.topics.split(", ");
      this.roadmapService
        .updateRoadmap(this.roadmapId, { ...result, topics })
        .subscribe((res) => console.log(res));
    });
  }
}
