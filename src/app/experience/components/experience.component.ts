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
import { DropListDateComponent } from "src/app/shared/components/drop-list/drop-list-date/drop-list-date.component";
import { MatDialog } from "@angular/material/dialog";
import { BreakpointObserver } from "@angular/cdk/layout";
import { MEDIA_QUERIES } from "src/app/shared/constants/breakpoints.constants";

@Component({
  selector: "app-experience",
  templateUrl: "./experience.component.html",
  styleUrls: ["./experience.component.scss"],
})
export class ExperienceComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public isMobileDevice = false;
  public selectedFilterType: null | string = null;
  public selectedFilterLanguage: null | string = null;
  public selectedView: "compact" | "expanded" = "compact";
  public typeConfig = EXPERIENCE_TYPE_CONFIG;
  public languageFilterData: any = [];
  public experience: Experience;
  public experienceId: string;
  public experienceList: any[];
  public displayAllOpportunities: boolean = false;
  public opportunitiesFullArray: RemoteJob[];
  public listsLastIndex: { inProgress: number; done: number } = {
    inProgress: 0,
    done: 0,
  };

  public opportunities: RemoteJob[];
  public inProgress: Experience[];
  public done: Experience[];

  constructor(
    private experienceStoreService: ExperienceStoreService,
    private recommendationsStoreService: RecommendationsStoreService,
    private dropListService: DropListService,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
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
        this.opportunitiesFullArray = [...jobs];
        this.opportunities = [...this.opportunitiesFullArray].splice(0, 4);
      });

    this.breakpointObserver
      .observe(MEDIA_QUERIES.BREAKPOINTS)
      .subscribe((result) => {
        this.isMobileDevice = MEDIA_QUERIES.MOBILE.find(
          (size) => result.breakpoints[size]
        )
          ? true
          : false;
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

    this.listsLastIndex = {
      inProgress: this.inProgress.length,
      done: this.done.length,
    };
  }

  sortItems(arr: any[]): any[] {
    if (!arr.length) return [];
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

  createExperienceItem(item: any) {
    if (item.data) {
      let newItem = { ...item.data };
      newItem.pinned = false;

      newItem = this.dropListService.getItemListAndPosition(
        newItem,
        this.listsLastIndex
      );

      this.experienceStoreService.createExperienceItem(item.id, newItem);
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    const currentContainer = event.container;
    const previousContainer = event.previousContainer;
    const previousIndex = event.previousIndex;

    const handleUpdate = (result?: {
      end?: Date | null;
      start?: Date | null;
    }) => {
      const updatedItems = this.dropListService.drop(event, result);

      if (updatedItems.length) {
        this.experienceStoreService.bulkUpdateExperienceItems(
          this.experience._id,
          updatedItems
        );
      }
    };

    if (previousContainer !== currentContainer) {
      const droppedItem = previousContainer.data[previousIndex];

      if (currentContainer.id === STATUS.TODO) {
        handleUpdate({ end: null, start: null });
      } else if (
        currentContainer.id === STATUS.IN_PROGRESS &&
        droppedItem.startDate
      ) {
        handleUpdate({ end: null });
      } else {
        this.dialog
          .open(DropListDateComponent, {
            minWidth: "40vw",
            disableClose: true,
            data: {
              item: droppedItem,
              container: currentContainer.id,
            },
          })
          .afterClosed()
          .subscribe((result: any) => {
            if (result) handleUpdate(result);
            else return;
          });
      }
    } else {
      handleUpdate();
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

  toggleShowAllOpportunities() {
    if (this.displayAllOpportunities) {
      this.opportunities = [...this.opportunitiesFullArray].splice(0, 4);
      this.displayAllOpportunities = false;
    } else {
      this.opportunities = [...this.opportunitiesFullArray];
      this.displayAllOpportunities = true;
    }
  }
}
