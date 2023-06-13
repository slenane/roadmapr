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
  public employmentList: any[];

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
        if (this.employment.employmentList.length) {
          this.sortEmploymentList([...this.employment.employmentList]);
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  sortEmploymentList(list: any[]) {
    const previousEmployment = list.filter((item) => item.endDate);
    const currentEmployment = list.filter((item) => !item.endDate);

    this.employmentList = [
      ...currentEmployment.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      ),
      ...previousEmployment.sort(
        (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
      ),
    ];
  }

  addEmployment() {
    const dialogRef = this.dialog.open(EmploymentUpdateComponent, {
      width: "60vw",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employmentStoreService.createEmploymentItem(
          this.employment._id,
          result
        );
      }
    });
  }
}
