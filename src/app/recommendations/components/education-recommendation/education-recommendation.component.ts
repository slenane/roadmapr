import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Recommendation } from "src/app/recommendations/store/recommendations.models";
import { EducationRecommendationDetailsComponent } from "./education-recommendation-details/education-recommendation-details.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-education-recommendation",
  templateUrl: "./education-recommendation.component.html",
  styleUrls: ["./education-recommendation.component.scss"],
})
export class EducationRecommendationComponent implements OnInit {
  public percentageRecommended: number;
  public removeButtonDisplayed: boolean = false;

  @Input() data: Recommendation;
  @Input() index: number;
  @Input() selectedView: string;

  @Output() onRemoveRecommendation: EventEmitter<number> = new EventEmitter();
  @Output() onAddToList: EventEmitter<{ item: Recommendation; index: number }> =
    new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.percentageRecommended =
      (this.data.recommended / this.data.count) * 100;
  }

  openRecommendationDetails() {
    const dialogRef = this.dialog.open(
      EducationRecommendationDetailsComponent,
      {
        panelClass: "modal-class",
        data: { ...this.data },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onAddToList.emit({ item: this.data, index: this.index });
      }
    });
  }

  showRemoveButton() {
    this.removeButtonDisplayed = true;
  }

  hideRemoveButton() {
    this.removeButtonDisplayed = false;
  }
}
