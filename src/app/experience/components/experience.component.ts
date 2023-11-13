import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { Experience } from "../store/experience.models";
// import { ExperienceService } from "../services/experience.service";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { DropListService } from "src/app/shared/services/drop-list.service";
import {
  EXPERIENCE_TYPE_CONFIG,
  STATUS,
} from "src/app/experience/constants/experience.constants";
import { experienceInitialState } from "../store/experience.reducer";
import { ExperienceStoreService } from "../services/experience-store.service";
import { RecommendationsStoreService } from "src/app/recommendations/services/recommendations-store.service";
import { RemoteJob } from "src/app/recommendations/store/recommendations.models";

@Component({
  selector: "app-experience",
  templateUrl: "./experience.component.html",
  styleUrls: ["./experience.component.scss"],
})
export class ExperienceComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public selectedFilterType: null | string = null;
  public selectedFilterLanguage: null | string = null;
  public selectedView: "compact" | "expanded" = "compact";
  public typeConfig = EXPERIENCE_TYPE_CONFIG;
  public languageFilterData: any = [];
  public experience: Experience;
  public experienceId: string;
  public experienceList: any[];

  public opportunities: any[];
  public inProgress: any[];
  public done: any[];

  constructor(
    // private experienceService: ExperienceService,
    private experienceStoreService: ExperienceStoreService,
    private recommendationsStoreService: RecommendationsStoreService,
    private dropListService: DropListService
  ) {}

  ngOnInit(): void {
    this.experienceStoreService
      .getExperience(this.experienceId ? this.experienceId : "")
      .pipe(
        filter((state) => state != experienceInitialState),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((experience: Experience) => {
        this.experience = experience;
        this.experienceList = this.experience.experienceList;
        this.getExperienceConfig(this.experience.experienceList);
        this.getLanguageFilterData();
      });

    this.recommendationsStoreService
      .getRemoteJobs()
      .pipe(
        filter((state) => state?.length),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((jobs: RemoteJob[]) => {
        this.opportunities = [...jobs];
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getExperienceConfig(experience: any[]): void {
    const inProgressArray: any[] = [],
      doneArray: any[] = [];

    experience.forEach((item) => {
      if (item.status === STATUS.IN_PROGRESS) inProgressArray.push(item);
      else if (item.status === STATUS.DONE) doneArray.push(item);
    });

    this.inProgress = this.sortItems(inProgressArray);
    this.done = this.sortItems(doneArray);
  }

  sortItems(arr: any[]): any[] {
    return arr.sort((a: any, b: any): number => {
      if (a.position < b.position) return -1;
      else if (a.position > b.position) return 1;
      else return 0;
    });
  }

  getLanguageFilterData() {
    const experience: any[] = this.experienceList;
    const languageData: any[] = [];
    const languages: any[] = [];

    experience.forEach((item) => {
      item.stack.forEach((language: any) => {
        if (!languageData[language.name]) {
          languageData[language.name] = {
            count: 0,
          };
          languages.push(language);
        }
        languageData[language.name].count++;
      });
    });

    const sortable = [];

    for (let item in languageData) {
      sortable.push([item, languageData[item].count]);
    }

    this.languageFilterData = [
      ...[...sortable.sort((a, b) => b[1] - a[1]).splice(0, 10)].map((item) => {
        return languages.find((language) => language.name === item[0]);
      }),
    ];
  }

  filterByType($event: null | string) {
    this.selectedFilterType = $event;
  }

  filterByLanguage($event: null | string) {
    this.selectedFilterLanguage = $event;
  }

  updateView($event: any) {
    this.selectedView = $event;
  }

  matchesFilters(data: any) {
    return (
      (this.selectedFilterType === null ||
        this.selectedFilterType === data.type) &&
      (this.selectedFilterLanguage === null ||
        data.stack.find(
          (item: any) => item.name === this.selectedFilterLanguage
        ))
    );
  }

  // sortExperienceList(list: any[]) {
  //   const previousExperience = list.filter((item) => item.endDate);
  //   const currentExperience = list.filter((item) => !item.endDate);

  //   this.experienceList = [
  //     ...currentExperience.sort(
  //       (a, b) =>
  //         new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  //     ),
  //     ...previousExperience.sort(
  //       (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
  //     ),
  //   ];
  // }

  createExperienceItem(item: any) {
    if (item.data) {
      const newItem = { ...item.data };
      newItem.pinned = false;

      if (newItem.startDate && !newItem.endDate) {
        newItem.status = STATUS.IN_PROGRESS;
        newItem.position = this.inProgress.length;
      } else {
        newItem.status = STATUS.DONE;
        newItem.position = this.done.length;
      }

      this.experienceStoreService.createExperienceItem(item.id, item.data);
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    const updatedItems = this.dropListService.drop(event);

    if (updatedItems.length) {
      this.experienceStoreService.bulkUpdateExperienceItems(
        this.experience._id,
        updatedItems
      );
    }
  }

  onPinToggle(data: any, itemList: any[]) {
    const updatedItems = this.dropListService.onPinToggle(itemList, data);

    if (updatedItems) {
      this.experienceStoreService.bulkUpdateExperienceItems(
        this.experience._id,
        updatedItems
      );
    }
  }
}
