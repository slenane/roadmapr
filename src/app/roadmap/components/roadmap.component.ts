import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Subject, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { Roadmap } from '../store/roadmap.models';
// import { RoadmapService} from 'src/app/roadmap/services/roadmap.service';
import { DUMMY_ROADMAP } from '../constants/dummy.constants';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject < void > = new Subject < void > ();
  public roadmap = DUMMY_ROADMAP;
  public roadmapItemArray: [];
  public filterType = 'date';
  public userId = 1;

  constructor(
    // private roadmapService: RoadmapService
  ) { }

  ngOnInit(): void {
    this.roadmapItemArray = this.generateRoadmap(this.roadmap, this.filterType);
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
      case 'date':
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
}
