import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AlertsComponent } from "../components/alerts/alerts.component";

@Injectable({
  providedIn: "root",
})
export class AlertsService {
  constructor(private snackBar: MatSnackBar) {}

  successAlert(message: string) {
    this.snackBar.openFromComponent(AlertsComponent, {
      data: message,
      duration: 5000,
    });
  }

  errorAlert(message: string) {
    this.snackBar.openFromComponent(AlertsComponent, {
      data: message,
      duration: 10000,
      panelClass: ["snackbar-error"],
    });
  }
}
