import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { Employment } from "../store/employment.models";
import { EmploymentStoreService } from "../services/employment-store.service";
// import { EmploymentService } from "../services/employment.service";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { DropListService } from "src/app/core/services/drop-list.service";
import {
  EMPLOYMENT_TYPE_CONFIG,
  STATUS,
} from "src/app/employment/constants/employment.constants";

@Component({
  selector: "app-employment",
  templateUrl: "./employment.component.html",
  styleUrls: ["./employment.component.scss"],
})
export class EmploymentComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public selectedFilterType: null | string = null;
  public selectedFilterLanguage: null | string = null;
  public selectedView: "compact" | "expanded" = "compact";
  public typeConfig = EMPLOYMENT_TYPE_CONFIG;
  public languageFilterData: any = [];
  public employment: Employment;
  public employmentId: string;
  public employmentList: any[];

  public todo: any[];
  public inProgress: any[];
  public done: any[];

  constructor(
    // private employmentService: EmploymentService,
    private employmentStoreService: EmploymentStoreService,
    private dropListService: DropListService
  ) {}

  ngOnInit(): void {
    this.employmentStoreService
      .getEmployment(this.employmentId ? this.employmentId : "")
      .pipe(
        filter((state) => state != null),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((employment: Employment) => {
        this.employment = employment;
        this.employmentList = this.employment.employmentList;

        if (this.employmentList.length) {
          this.getEmploymentConfig(this.employment.employmentList);
          this.getLanguageFilterData();
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getEmploymentConfig(employment: any[]): void {
    const todoArray: any[] = [],
      inProgressArray: any[] = [],
      doneArray: any[] = [];

    employment.forEach((item) => {
      if (item.status === STATUS.IN_PROGRESS) inProgressArray.push(item);
      else if (item.status === STATUS.DONE) doneArray.push(item);
      else todoArray.push(item);
    });

    this.todo = this.sortItems(todoArray);
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
    const employment: any[] = this.employmentList;
    const languageData: any[] = [];
    const languages: any[] = [];

    employment.forEach((item) => {
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

  // sortEmploymentList(list: any[]) {
  //   const previousEmployment = list.filter((item) => item.endDate);
  //   const currentEmployment = list.filter((item) => !item.endDate);

  //   this.employmentList = [
  //     ...currentEmployment.sort(
  //       (a, b) =>
  //         new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  //     ),
  //     ...previousEmployment.sort(
  //       (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
  //     ),
  //   ];
  // }

  createEmploymentItem(item: any) {
    if (item.data) {
      const newItem = { ...item.data };
      newItem.pinned = false;

      if (!newItem.startDate && !newItem.endDate) {
        newItem.status = STATUS.TODO;
        newItem.position = this.todo.length;
      } else if (newItem.startDate && !newItem.endDate) {
        newItem.status = STATUS.IN_PROGRESS;
        newItem.position = this.inProgress.length;
      } else {
        newItem.status = STATUS.DONE;
        newItem.position = this.done.length;
      }

      this.employmentStoreService.createEmploymentItem(item.id, item.data);
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    const updatedItems = this.dropListService.drop(event);

    console.log(updatedItems);
    if (updatedItems.length) {
      this.employmentStoreService.bulkUpdateEmploymentItems(
        this.employment._id,
        updatedItems
      );
    }
  }

  onPinToggle(data: any, itemList: any[]) {
    const updatedItems = this.dropListService.onPinToggle(itemList, data);

    if (updatedItems) {
      this.employmentStoreService.bulkUpdateEmploymentItems(
        this.employment._id,
        updatedItems
      );
    }
  }
}
