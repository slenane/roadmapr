import { Component, OnDestroy, OnInit } from "@angular/core";
// import { Subject, takeUntil } from 'rxjs';
import { Subject } from "rxjs";
// import { RoadmapService} from 'src/app/roadmap/services/roadmap.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { AuthService } from "src/app/core/services/auth.service";
import { UserDetails } from "src/app/core/store/auth.models";
import { Roadmap } from "../store/roadmap.models";

@Component({
  selector: "app-roadmap",
  templateUrl: "./roadmap.component.html",
  styleUrls: ["./roadmap.component.scss"],
})
export class RoadmapComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public todoArray: any[];
  public inProgressArray: any[];
  public doneArray: any[];
  public selectedFilter: null | string = null;
  public filterType = "date";
  public user: UserDetails | null;
  public roadmap: Roadmap;

  constructor(private authService: AuthService) {} // private roadmapService: RoadmapService

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
        this.roadmap = user.roadmap;
        this.getRoadmapConfig();
      },
      error: (err) => console.error(err),
    });
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

  getRoadmapConfig(): void {
    const roadmap = this.generateRoadmap(this.roadmap, this.filterType);
    console.log(roadmap);
    this.todoArray = roadmap.filter((item: any) => !item.startDate);
    this.inProgressArray = roadmap.filter(
      (item: any) => item.startDate && !item.endDate
    );
    this.doneArray = roadmap.filter((item: any) => item.endDate);
  }

  generateRoadmap(roadmap: any, filter: string): any {
    switch (filter) {
      case "date":
        return this.sortByDate(roadmap);
    }
  }

  sortByDate(roadmap: any): any[] {
    const items: any[] = [];
    const categories = ["books", "courses", "degrees", "tutorials"];

    for (const category of categories) {
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
