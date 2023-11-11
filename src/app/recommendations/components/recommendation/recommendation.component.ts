import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Recommendation } from "../../store/recommendations.models";

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

  constructor() {}

  ngOnInit(): void {
    this.percentageRecommended =
      (this.data.recommended / this.data.count) * 100;
  }

  openRecommendationDetails() {}

  showRemoveButton() {
    this.removeButtonDisplayed = true;
  }

  hideRemoveButton() {
    this.removeButtonDisplayed = false;
  }
}
