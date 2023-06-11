import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { Employment } from "../store/employment.models";
import { EmploymentStoreService } from "../services/employment-store.service";
import { MatDialog } from "@angular/material/dialog";
import { EmploymentUpdateComponent } from "./employment-update/employment-update.component";

@Component({
  selector: "app-employment",
  templateUrl: "./employment.component.html",
  styleUrls: ["./employment.component.scss"],
})
export class EmploymentComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public filterType = "date";
  public employment: Employment;
  public employmentId: string;

  constructor(
    private employmentStoreService: EmploymentStoreService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.employmentStoreService
      .getEmployment(this.employmentId ? this.employmentId : "")
      .pipe(
        filter((state) => state != null),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((employment: Employment) => {
        this.employment = employment;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  addEmployment() {
    const dialogRef = this.dialog.open(EmploymentUpdateComponent, {
      width: "60vw",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employmentStoreService.createEmploymentItem(
          this.employmentId,
          result
        );
      }
    });
  }
}
