import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Recommendation } from "../../store/recommendations.models";
import { RecommendationDetailsComponent } from "./recommendation-details/recommendation-details.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-recommendation",
  templateUrl: "./recommendation.component.html",
  styleUrls: ["./recommendation.component.scss"],
})
export class RecommendationComponent implements OnInit {
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
    const dialogRef = this.dialog.open(RecommendationDetailsComponent, {
      width: "50vw",
      data: { ...this.data },
    });

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
