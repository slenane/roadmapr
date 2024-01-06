import { Component, OnInit, Inject, SimpleChanges } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { ProjectsStoreService } from "src/app/projects/services/projects-store.service";
import { ProjectsUpdateComponent } from "../../projects-update/projects-update.component";
import { DropListService } from "src/app/shared/services/drop-list.service";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.scss"],
})
export class ProjectDetailsComponent implements OnInit {
  public item: any;

  constructor(
    private projectsStoreService: ProjectsStoreService,
    private dropListService: DropListService,
    public dialogRef: MatDialogRef<ProjectDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.item = this.data.item;
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  editItem() {
    const dialogRef = this.dialog.open(ProjectsUpdateComponent, {
      panelClass: "modal-edit-class",
      data: this.item,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.item = { ...this.item, ...result };
        this.item = this.dropListService.getItemListAndPosition(
          this.item,
          this.data.listsLastIndex
        );
        this.projectsStoreService.updateProject(this.item);
      }
    });
  }

  deleteItem() {
    this.projectsStoreService.removeProject(this.item);
    this.dialogRef.close(false);
  }
}
