import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AlertsComponent } from "../components/alerts/alerts.component";

@Injectable({
  providedIn: "root",
})
export class AlertsService {
  constructor(private snackBar: MatSnackBar) {}

  successAlert(message: string, value?: string) {
    this.snackBar.openFromComponent(AlertsComponent, {
      horizontalPosition: "right",
      data: {
        message,
        value,
      },
      duration: 3000,
      panelClass: ["snackbar-success"],
    });
  }

  errorAlert(message: string, value?: string) {
    this.snackBar.openFromComponent(AlertsComponent, {
      horizontalPosition: "right",
      data: {
        message,
        value,
      },
      duration: 10000,
      panelClass: ["snackbar-error"],
    });
  }
}
