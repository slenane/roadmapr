import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EmploymentUpdateComponent } from "src/app/employment/components/employment-update/employment-update.component";
import { ProjectsUpdateComponent } from "src/app/projects/components/projects-update/projects-update.component";
import { RoadmapUpdateComponent } from "src/app/roadmap/components/roadmap-update/roadmap-update.component";

@Component({
  selector: "app-drop-list-filters",
  templateUrl: "./drop-list-filters.component.html",
  styleUrls: ["./drop-list-filters.component.scss"],
})
export class DropListFiltersComponent implements OnInit {
  public selectedView: "compact" | "expanded" = "compact";
  public selectedLanguage: any = null;
  public selectedType: null | "book" | "course" | "degree" | "tutorial" = null;
  public filters = [
    { title: "Books", type: "book" },
    { title: "Courses", type: "course" },
    { title: "Degrees", type: "degree" },
    { title: "Tutorials", type: "tutorial" },
  ];

  @Input() type: "employment" | "roadmap" | "projects";
  @Input() parentId: string;
  @Input() typeConfig: any[];
  @Input() languageConfig: any[];
  @Output() onFilterType: EventEmitter<null | string> = new EventEmitter();
  @Output() onFilterLanguage: EventEmitter<null | string> = new EventEmitter();
  @Output() onUpdateView: EventEmitter<any> = new EventEmitter();
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();

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
    let dialogRef;

    if (this.type === "employment")
      dialogRef = this.dialog.open(EmploymentUpdateComponent, {
        width: "60vw",
      });
    else if (this.type === "roadmap")
      dialogRef = this.dialog.open(RoadmapUpdateComponent, { width: "60vw" });
    else
      dialogRef = this.dialog.open(ProjectsUpdateComponent, { width: "60vw" });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.onUpdate.emit({ id: this.parentId, data: result });
    });
  }
}