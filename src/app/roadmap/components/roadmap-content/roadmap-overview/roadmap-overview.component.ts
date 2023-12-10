import {
  Component,
  OnChanges,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import { Profile } from "src/app/profile/store/profile.models";
import { RoadmapService } from "src/app/roadmap/services/roadmap.service";
import { Roadmap } from "src/app/roadmap/store/roadmap.models";
import { RoadmapUpdateComponent } from "../../roadmap-update/roadmap-update.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-roadmap-overview",
  templateUrl: "./roadmap-overview.component.html",
  styleUrls: ["./roadmap-overview.component.scss"],
})
export class RoadmapOverviewComponent implements OnInit, OnChanges {
  public languages: number = 0;
  public time: { years: number; days: number } = { years: 0, days: 0 };

  @Input() roadmap: Roadmap;
  @Input() user: Profile;
  @Input() stackList: any[];
  @Output() onUpdate = new EventEmitter();

  constructor(
    private roadmapService: RoadmapService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.roadmap &&
      changes.roadmap.currentValue != changes.roadmap.previousValue
    ) {
      this.generateData();
    }
  }

  generateData() {
    this.languages = Object.keys(this.stackList).length;
    this.time = this.roadmapService.getTimeStringSinceDate(
      this.roadmapService.getStartDate([
        ...this.roadmap.education,
        ...this.roadmap.projects,
        ...this.roadmap.experience,
      ])
    );
  }

  editRoadmap() {
    const dialogRef = this.dialog.open(RoadmapUpdateComponent, {
      minHeight: "90vh",
      minWidth: "70vw",
      autoFocus: false,
      data: {
        path: this.roadmap.path,
        stack: this.roadmap.stack,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.onUpdate.emit(result);
    });
  }
}
