import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
// import { validateConfirmPattern } from "src/app/shared/constants/validators.constants";

@Component({
  selector: "app-settings-delete-account",
  templateUrl: "./settings-delete-account.component.html",
  styleUrls: ["./settings-delete-account.component.scss"],
})
export class SettingsDeleteAccountComponent implements OnInit {
  public deleteAccountForm = new FormGroup({
    deleteCtrl: new FormControl("", Validators.pattern(/confirm/i)),
  });

  constructor(
    public dialogRef: MatDialogRef<SettingsDeleteAccountComponent>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDeleteClick(): void {
    if (
      this.deleteAccountForm.value.deleteCtrl?.toLocaleLowerCase() === "confirm"
    ) {
      this.dialogRef.close(true);
    }
  }
}
