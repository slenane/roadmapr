import { Component, OnInit } from "@angular/core";
import { User } from "src/app/core/store/auth.models";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { Employment } from "../store/employment.models";
import { EmploymentService } from "../services/employment.service";
import { EmploymentStoreService } from "../services/employment-store.service";
import { Store } from "@ngrx/store";
import { Profile } from "src/app/profile/store/profile.models";
import { MatDialog } from "@angular/material/dialog";
import * as profileSelectors from "src/app/profile/store/profile.selectors";
import { EmploymentUpdateComponent } from "./employment-update/employment-update.component";

@Component({
  selector: "app-employment",
  templateUrl: "./employment.component.html",
  styleUrls: ["./employment.component.scss"],
})
export class EmploymentComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public filterType = "date";
  public user: User | null;
  public employment: Employment;
  public employmentId: string;

  constructor(
    private employmentService: EmploymentService,
    private employmentStoreService: EmploymentStoreService,
    private store: Store<Profile>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store
      .select(profileSelectors.getProfile)
      .pipe(
        filter((data) => !!data),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((user) => {
        this.employmentId = user.employment;

        if (this.employmentId) {
          this.employmentStoreService
            .getEmployment(this.employmentId)
            .pipe(
              filter((state) => state != null),
              takeUntil(this.ngUnsubscribe)
            )
            .subscribe((employment: Employment) => {
              this.employment = employment;
            });
        }
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
        console.log(this.employment, result);
        this.employmentStoreService.createEmploymentItem(
          this.employmentId,
          result
        );
      }
    });
  }
}
