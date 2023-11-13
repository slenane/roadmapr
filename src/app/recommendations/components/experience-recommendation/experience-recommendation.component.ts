import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ExperienceRecommendationDetailsComponent } from "./experience-recommendation-details/experience-recommendation-details.component";
import { STACK_LIST } from "src/app/shared/constants/stack-list.constants";

@Component({
  selector: "app-experience-recommendation",
  templateUrl: "./experience-recommendation.component.html",
  styleUrls: ["./experience-recommendation.component.scss"],
})
export class ExperienceRecommendationComponent implements OnInit {
  public removeButtonDisplayed: boolean = false;
  public stack: any[] = [...STACK_LIST];

  @Input() data: any;
  @Input() index: number;

  @Output() onRemoveRecommendation: EventEmitter<number> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  openRecommendationDetails() {
    this.dialog.open(ExperienceRecommendationDetailsComponent, {
      width: "50vw",
      data: { ...this.data },
    });
  }

  showRemoveButton() {
    this.removeButtonDisplayed = true;
  }

  hideRemoveButton() {
    this.removeButtonDisplayed = false;
  }
}
