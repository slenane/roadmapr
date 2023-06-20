import { Component, EventEmitter, OnInit, Output, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ProjectsUpdateComponent } from "../projects-update/projects-update.component";

@Component({
  selector: "app-projects-filters",
  templateUrl: "./projects-filters.component.html",
  styleUrls: ["./projects-filters.component.scss"],
})
export class ProjectsFiltersComponent implements OnInit {
  public selectedView: "dense" | "sparse" = "dense";
  // public filters = [
  //   { title: "Employment", type: "employment" },
  //   { title: "Freelance", type: "freelance" },
  // ];

  @Input() projectsId: string;
  @Output() filterProjects: EventEmitter<null | string> = new EventEmitter();
  @Output() onUpdateView: EventEmitter<any> = new EventEmitter();
  @Output() updateProjects: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  addItem(): void {
    const dialogRef = this.dialog.open(ProjectsUpdateComponent, {
      width: "60vw",
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.updateProjects.emit({ id: this.projectsId, data: result });
    });
  }
}
