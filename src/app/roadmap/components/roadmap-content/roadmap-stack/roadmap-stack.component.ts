import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  IDeveloperPath,
  IStack,
  IStackItem,
  IStackItemCount,
} from "src/app/shared/constants/dev-paths.constants";
import { RoadmapUpdateComponent } from "../../roadmap-update/roadmap-update.component";

@Component({
  selector: "app-roadmap-stack",
  templateUrl: "./roadmap-stack.component.html",
  styleUrls: ["./roadmap-stack.component.scss"],
})
export class RoadmapStackComponent implements OnInit {
  public incrementValue: number;
  public stackGridOne: IStackItemCount[] = [];
  public stackGridTwo: IStackItemCount[] = [];
  public activeStack: IStack | undefined;
  public showStackSubHeaders = true;
  public isCustomStackEmpty = false;

  @Input() stackList: any;
  @Input() userStack: IStack | undefined;
  @Input() stackItemConfig: IStackItem[];
  @Input() path: IDeveloperPath | undefined;
  @Output() onUpdate = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.updateStackData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes.userStack &&
        changes.userStack.currentValue != changes.userStack.previousValue) ||
      (changes.stackList &&
        changes.stackList.currentValue != changes.stackList.previousValue)
    ) {
      this.updateStackData();
    }
  }

  updateStackData() {
    if (this.userStack) {
      this.activeStack = this.getActiveStackData(this.userStack);
      this.getIncrementValue();
      this.getSortedStack();
    } else {
      this.activeStack = undefined;
    }
  }

  getActiveStackData(stack: IStack): IStack | undefined {
    if (stack.title !== "STACKS.TITLES.CUSTOM") {
      this.isCustomStackEmpty = false;
      return stack;
    } else {
      this.isCustomStackEmpty = !this.stackItemConfig.length;
      return {
        ...stack,
        title: "STACKS.TITLES.STACK",
        stack: {
          core: [...this.stackItemConfig],
        },
      };
    }
  }

  getIncrementValue() {
    let highestCount = 0;
    for (let stack in this.stackList) {
      if (this.stackList[stack].count > highestCount)
        highestCount = this.stackList[stack].count;
    }
    this.incrementValue = 100 / highestCount;
  }

  getSortedStack() {
    const core: IStackItemCount[] = [],
      choice: IStackItemCount[] = [],
      bonus: IStackItemCount[] = [];

    if (this.activeStack?.stack.core) {
      this.showStackSubHeaders = false;
      for (let stack of this.activeStack?.stack.core) {
        core.push({
          ...stack,
          count: this.getCount(stack),
          list: "core",
        });
      }
    }

    if (this.activeStack?.stack.choice) {
      this.showStackSubHeaders = true;
      for (let stack of this.activeStack?.stack.choice) {
        choice.push({
          ...stack,
          count: this.getCount(stack),
          list: "choice",
        });
      }
    }
    if (this.activeStack?.stack.bonus) {
      this.showStackSubHeaders = true;
      for (let stack of this.activeStack?.stack.bonus) {
        bonus.push({
          ...stack,
          count: this.getCount(stack),
          list: "bonus",
        });
      }
    }

    core.sort((a, b) => b.count - a.count);
    choice.sort((a, b) => b.count - a.count);
    bonus.sort((a, b) => b.count - a.count);

    if (core.length) core[0].first = true;
    if (choice.length) choice[0].first = true;
    if (bonus.length) bonus[0].first = true;

    const [column1, column2] = this.splitArrayIntoTwoColumns([
      ...core,
      ...choice,
      ...bonus,
    ]);

    this.stackGridOne = column1;
    this.stackGridTwo = column2;
  }

  getPercentageValue(stack: IStackItemCount): number {
    return !!stack.count ? stack.count * this.incrementValue : 0;
  }

  getCount(stack: IStackItem): number {
    if (this.stackList[stack.name]) {
      return this.stackList[stack.name].count;
    } else {
      return 0;
    }
  }

  splitArrayIntoTwoColumns(arr: IStackItemCount[]) {
    const listCount = Math.ceil(arr.filter((item) => item.first).length / 2);
    const midpoint = Math.ceil((arr.length - listCount) / 2);

    const column1 = arr.slice(0, midpoint);
    const column2 = arr.slice(midpoint);

    return [column1, column2];
  }

  editRoadmap() {
    const dialogRef = this.dialog.open(RoadmapUpdateComponent, {
      minHeight: "90vh",
      minWidth: "70vw",
      autoFocus: false,
      data: {
        path: this.path,
        stack: undefined,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.onUpdate.emit(result);
    });
  }
}
