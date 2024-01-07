import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Education } from "../store/education.models";
import { EducationStoreService } from "../services/education-store.service";
import {
  EDUCATION_TYPE_CONFIG,
  STATUS,
} from "../constants/education.constants";
import { DropListService } from "src/app/shared/services/drop-list.service";
import { educationInitialState } from "../store/education.reducer";
import { RecommendationsStoreService } from "src/app/recommendations/services/recommendations-store.service";
import { Recommendation } from "src/app/recommendations/store/recommendations.models";
import { DropListDateComponent } from "src/app/shared/components/drop-list/drop-list-date/drop-list-date.component";
import { MatDialog } from "@angular/material/dialog";
import { BreakpointObserver } from "@angular/cdk/layout";
import { MEDIA_QUERIES } from "src/app/shared/constants/breakpoints.constants";

@Component({
  selector: "app-education",
  templateUrl: "./education.component.html",
  styleUrls: ["./education.component.scss"],
})
export class EducationComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public isMobileDevice = false;
  public selectedFilterType: null | string = null;
  public selectedFilterLanguage: null | string = null;
  public selectedView: "compact" | "expanded" = "compact";
  public typeConfig = EDUCATION_TYPE_CONFIG;
  public languageFilterData: any = [];
  public education: Education;
  public educationId: string;
  public educationList: any[] = [];
  public listsLastIndex: { todo: number; inProgress: number; done: number } = {
    todo: 0,
    inProgress: 0,
    done: 0,
  };

  public todo: any[];
  public inProgress: any[];
  public done: any[];
  public recommendations: Recommendation[];

  constructor(
    private educationStoreService: EducationStoreService,
    private recommendationsStoreService: RecommendationsStoreService,
    private dropListService: DropListService,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.educationStoreService
      .getEducation(this.educationId ? this.educationId : "")
      .pipe(
        filter((state) => state != educationInitialState),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((education: Education) => {
        this.education = education;
        this.educationList = this.education.educationList;
        this.getEducationConfig(this.educationList);
        this.getLanguageFilterData();
      });

    this.recommendationsStoreService
      .getRecommendations()
      .pipe(
        filter((state) => state?.length),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((recommendations: Recommendation[]) => {
        console.log(recommendations);
        this.recommendations = [...recommendations];
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

  getEducationConfig(education: any[]): void {
    const todoArray: any[] = [],
      inProgressArray: any[] = [],
      doneArray: any[] = [];

    education.forEach((item) => {
      if (item.status === STATUS.IN_PROGRESS) inProgressArray.push(item);
      else if (item.status === STATUS.DONE) doneArray.push(item);
      else todoArray.push(item);
    });

    this.todo = this.sortItems(todoArray);
    this.inProgress = this.sortItems(inProgressArray);
    this.done = this.sortItems(doneArray);

    this.listsLastIndex = {
      todo: this.todo.length,
      inProgress: this.inProgress.length,
      done: this.done.length,
    };
  }

  sortItems(arr: any[]): any[] {
    return arr.sort((a: any, b: any): number => {
      if (a.position < b.position) return -1;
      else if (a.position > b.position) return 1;
      else return 0;
    });
  }

  getLanguageFilterData() {
    const education: any[] = this.educationList;
    const languageData: any[] = [];
    const languages: any[] = [];

    education.forEach((item) => {
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

  updateView(view: "compact" | "expanded") {
    console.log(view);
    this.selectedView = view;
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

  createEducationItem(item: any) {
    if (item.data) {
      let newItem = { ...item.data };
      newItem.pinned = false;

      newItem = this.dropListService.getItemListAndPosition(
        newItem,
        this.listsLastIndex
      );
      this.educationStoreService.createEducationItem(item.id, newItem);
    }
  }

  createEducationItemFromRecommendation(item: any) {
    if (item.data) {
      const newItem = {
        author: item.data.author,
        description: item.data.description,
        endDate: null,
        link: item.data.link,
        stack: item.data.stack,
        startDate: null,
        title: item.data.title,
        type: item.data.type,
        pinned: false,
        status: STATUS.TODO,
        position: this.todo.length,
      };

      this.educationStoreService.createEducationItem(item.id, newItem);
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
        this.educationStoreService.bulkUpdateEducationItems(
          this.education._id,
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
      this.educationStoreService.bulkUpdateEducationItems(
        this.education._id,
        updatedItems
      );
    }
  }

  removeRecommendationAtIndex(index: number): void {
    this.recommendations.splice(index, 1);
  }

  addRecommendationToList(data: { item: Recommendation; index: number }): void {
    this.createEducationItemFromRecommendation({
      id: this.education._id,
      data: data.item,
    });
    this.removeRecommendationAtIndex(data.index);
  }
}
