import { Component, EventEmitter, OnInit, Output, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { RoadmapUpdateComponent } from "../roadmap-update/roadmap-update.component";

@Component({
  selector: "app-roadmap-filters",
  templateUrl: "./roadmap-filters.component.html",
  styleUrls: ["./roadmap-filters.component.scss"],
})
export class RoadmapFiltersComponent implements OnInit {
  public selectedView: "compact" | "expanded" = "compact";
  public selectedLanguage: any = null;
  public selectedType: null | "book" | "course" | "degree" | "tutorial" = null;
  public filters = [
    { title: "Books", type: "book" },
    { title: "Courses", type: "course" },
    { title: "Degrees", type: "degree" },
    { title: "Tutorials", type: "tutorial" },
  ];

  @Input() roadmapId: string;
  @Input() languageFilterData: any[];
  @Output() onFilterType: EventEmitter<null | string> = new EventEmitter();
  @Output() onFilterLanguage: EventEmitter<null | string> = new EventEmitter();
  @Output() onUpdateView: EventEmitter<any> = new EventEmitter();
  @Output() updateRoadmap: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  filterType($event: any) {
    if (this.selectedType === $event) {
      this.onFilterType.emit(null);
      this.selectedType = null;
    } else {
      this.onFilterType.emit($event);
      this.selectedType = $event;
    }
  }

  filterLanguage($event: any) {
    if (this.selectedLanguage === $event) {
      this.onFilterLanguage.emit(null);
      this.selectedLanguage = null;
    } else {
      this.onFilterLanguage.emit($event);
      this.selectedLanguage = $event;
    }
  }

  addItem(): void {
    const dialogRef = this.dialog.open(RoadmapUpdateComponent, {
      width: "60vw",
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.updateRoadmap.emit({ id: this.roadmapId, data: result });
    });
  }
}
