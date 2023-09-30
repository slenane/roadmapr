import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UserSetupBasicDetailsComponent } from "./user-setup-basic-details/user-setup-basic-details.component";

@Component({
  selector: "app-user-setup",
  templateUrl: "./user-setup.component.html",
  styleUrls: ["./user-setup.component.scss"],
})
export class UserSetupComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    const dialogRef = this.dialog.open(UserSetupBasicDetailsComponent, {
      width: "50vw",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.educationStoreService.updateEducationItem(this.data);
      }
    });
  }
}
