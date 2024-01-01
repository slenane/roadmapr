import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { MEDIA_QUERIES } from "src/app/shared/constants/breakpoints.constants";

@Component({
  selector: "app-experience-recommendation-details",
  templateUrl: "./experience-recommendation-details.component.html",
  styleUrls: ["./experience-recommendation-details.component.scss"],
})
export class ExperienceRecommendationDetailsComponent implements OnInit {
  public isMobileDevice = false;
  public description: string;
  public location: string;
  public imageLoadError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ExperienceRecommendationDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.description = this.unescapeUnicode(this.data.description);
    this.location = this.data.location?.length
      ? this.data.location
      : "Worldwide";

    this.breakpointObserver
      .observe(MEDIA_QUERIES.BREAKPOINTS)
      .subscribe((result) => {
        this.isMobileDevice = MEDIA_QUERIES.MOBILE.find(
          (size) => result.breakpoints[size]
        )
          ? true
          : false;
      });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  unescapeUnicode(input: string): string {
    return decodeURIComponent(escape(input));
  }

  handleImageError() {
    this.imageLoadError = true;
  }
}
