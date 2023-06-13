import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EmploymentUpdateComponent } from "../employment-update/employment-update.component";
import { EmploymentStoreService } from "../../services/employment-store.service";

@Component({
  selector: "app-employment-item",
  templateUrl: "./employment-item.component.html",
  styleUrls: ["./employment-item.component.scss"],
})
export class EmploymentItemComponent implements OnInit {
  @Input() data: any;

  constructor(
    public dialog: MatDialog,
    private employmentStoreService: EmploymentStoreService
  ) {}

  ngOnInit(): void {}

  editItem() {
    const dialogRef = this.dialog.open(EmploymentUpdateComponent, {
      width: "60vw",
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.data = { ...this.data, ...result };
        this.employmentStoreService.updateEmploymentItem(this.data);
      }
    });
  }

  deleteItem() {
    this.employmentStoreService.removeEmploymentItem(this.data);
  }
}
