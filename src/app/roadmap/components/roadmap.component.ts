import { Component, OnDestroy, OnInit } from "@angular/core";
// import { Subject, takeUntil } from 'rxjs';
import { Subject } from "rxjs";
// import { Roadmap } from '../store/roadmap.models';
// import { RoadmapService} from 'src/app/roadmap/services/roadmap.service';
import { DUMMY_ROADMAP } from "../constants/dummy.constants";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";

@Component({
  selector: "app-roadmap",
  templateUrl: "./roadmap.component.html",
  styleUrls: ["./roadmap.component.scss"],
})
export class RoadmapComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public roadmap = DUMMY_ROADMAP;
  public todoArray: any[];
  public inProgressArray: any[];
  public doneArray: any[];
  public selectedFilter: null | string = null;
  public filterType = "date";
  public userId = 1;

  constructor() {} // private roadmapService: RoadmapService

  ngOnInit(): void {
    const roadmap = this.generateRoadmap(this.roadmap, this.filterType);
    this.todoArray = roadmap.filter((item: any) => !item.startDate);
    this.inProgressArray = roadmap.filter(
      (item: any) => item.startDate && !item.endDate
    );
    this.doneArray = roadmap.filter((item: any) => item.endDate);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // getRoadmapData() {
  //   this.roadmapService.getRoadmap(this.userId)
  //     .pipe(takeUntil(this.ngUnsubscribe))
  //     .subscribe({
  //       next: (data: Roadmap) => {
  //         this.roadmapData = data;
  //         console.log(this.roadmapData);
  //         // this.generateRoadmap(this.roadmapData);
  //       }
  //     })
  // }

  generateRoadmap(roadmap: any, filter: string): any {
    switch (filter) {
      case "date":
        return this.sortByDate(roadmap);
    }
  }

  sortByDate(roadmap: any): any[] {
    const items: any[] = [];

    for (const category in roadmap) {
      roadmap[category].forEach((item: any) => items.push(item));
    }

    return items;
  }

  filterRoadmap($event: null | string) {
    this.selectedFilter = $event;
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
