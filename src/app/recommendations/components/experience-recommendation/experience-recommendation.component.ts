import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ExperienceRecommendationDetailsComponent } from "./experience-recommendation-details/experience-recommendation-details.component";
import { STACK_LIST } from "src/app/shared/constants/stack-list.constants";
import { StackItem } from "src/app/shared/store/stack.models";

@Component({
  selector: "app-experience-recommendation",
  templateUrl: "./experience-recommendation.component.html",
  styleUrls: ["./experience-recommendation.component.scss"],
})
export class ExperienceRecommendationComponent implements OnInit {
  public stack: StackItem[] = [...STACK_LIST];

  @Input() data: any;
  @Input() index: number;

  @Output() onRemoveRecommendation: EventEmitter<number> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openRecommendationDetails() {
    this.dialog.open(ExperienceRecommendationDetailsComponent, {
      panelClass: "modal-edit-class",
      data: { ...this.data },
      autoFocus: false,
    });
  }
}
