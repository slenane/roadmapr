import { Component, EventEmitter, OnInit, Output, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EmploymentUpdateComponent } from "../employment-update/employment-update.component";

@Component({
  selector: "app-employment-filters",
  templateUrl: "./employment-filters.component.html",
  styleUrls: ["./employment-filters.component.scss"],
})
export class EmploymentFiltersComponent implements OnInit {
  public filters = [
    { title: "Employment", type: "employment" },
    { title: "Freelance", type: "freelance" },
  ];

  @Input() employmentId: string;
  @Output() filterEmployment: EventEmitter<null | string> = new EventEmitter();
  @Output() updateEmployment: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  addItem(): void {
    const dialogRef = this.dialog.open(EmploymentUpdateComponent, {
      width: "60vw",
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.updateEmployment.emit({ id: this.employmentId, data: result });
    });
  }
}
