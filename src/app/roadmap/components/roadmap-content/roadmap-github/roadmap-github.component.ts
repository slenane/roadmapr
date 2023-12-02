import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Github } from "src/app/roadmap/store/roadmap.models";
import { STACK_LIST } from "src/app/shared/constants/stack-list.constants";
import { StackItem } from "src/app/shared/store/stack.models";

@Component({
  selector: "app-roadmap-github",
  templateUrl: "./roadmap-github.component.html",
  styleUrls: ["./roadmap-github.component.scss"],
})
export class RoadmapGithubComponent implements OnInit, OnChanges {
  public languages: StackItem[];
  public stack: StackItem[] = [...STACK_LIST];
  public created: string;
  public updated: string;

  @Input() data: Github;

  constructor() {}

  ngOnInit(): void {
    this.getStackList();
    this.getDates();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.data.currentValue &&
      changes.data.currentValue != changes.data.previousValue
    ) {
    }
  }

  getStackList() {
    this.languages = this.stack.filter((item: StackItem) => {
      const repoLanguages = this.data.featuredRepo.languages;
      const itemTitleLower = item.title.toLowerCase();

      return Object.keys(repoLanguages).some((key) =>
        itemTitleLower.includes(key.toLowerCase())
      );
    });
  }

  getDates() {
    this.created = new Date(
      this.data.featuredRepo.createdAt
    ).toLocaleDateString("en-GB");
    this.updated = new Date(
      this.data.featuredRepo.updatedAt
    ).toLocaleDateString("en-GB");
  }
}
