import { Component, OnInit } from "@angular/core";
import {
  DEV_PATHS,
  DEV_PATH_ICONS,
  DEV_STACKS,
  IDeveloperPath,
  IDeveloperStack,
  IStack,
} from "src/app/shared/constants/dev-paths.constants";

@Component({
  selector: "app-explore",
  templateUrl: "./explore.component.html",
  styleUrls: ["./explore.component.scss"],
})
export class ExploreComponent implements OnInit {
  public DEV_PATHS = DEV_PATHS;
  public DEV_PATH_ICONS = DEV_PATH_ICONS;
  public DEV_STACKS = DEV_STACKS;
  public stackList: IStack[];

  public selectedPath: IDeveloperPath;
  public selectedStack: IDeveloperStack;

  constructor() {}

  ngOnInit(): void {}

  getStackListArray(): any[] {
    if (this.selectedPath) {
      return Object.values(this.stackList) ? Object.values(this.stackList) : [];
    }
    return [];
  }

  selectDevPath(path: IDeveloperPath) {
    this.selectedPath = path;
    this.stackList = this.DEV_STACKS.filter(
      (stack) => stack.path.name === path.name
    );
  }

  selectStack(stack: IDeveloperStack) {
    this.selectedStack = stack;
  }
}
