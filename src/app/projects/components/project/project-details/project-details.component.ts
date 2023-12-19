import { Component, OnInit, Inject, SimpleChanges } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { ProjectsStoreService } from "src/app/projects/services/projects-store.service";
import { ProjectsUpdateComponent } from "../../projects-update/projects-update.component";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.scss"],
})
export class ProjectDetailsComponent implements OnInit {
  constructor(
    private projectsStoreService: ProjectsStoreService,
    public dialogRef: MatDialogRef<ProjectDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  editItem() {
    const dialogRef = this.dialog.open(ProjectsUpdateComponent, {
      minWidth: "70vw",
      data: this.data,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.data = { ...this.data, ...result };
        this.projectsStoreService.updateProject(this.data);
      }
    });
  }

  deleteItem() {
    this.projectsStoreService.removeProject(this.data);
    this.dialogRef.close(false);
  }
}
