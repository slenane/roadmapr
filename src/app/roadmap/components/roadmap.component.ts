import { Component, OnInit } from "@angular/core";
import { RoadmapStoreService } from "../services/roadmap-store.service";
import { filter, takeUntil } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { Github, Roadmap } from "../store/roadmap.models";
import { roadmapInitialState } from "../store/roadmap.reducer";
import {
  CUSTOM_STACK,
  DEV_STACKS,
  IDeveloperStack,
  IStack,
  IStackItem,
} from "src/app/shared/constants/dev-paths.constants";
import { EducationItem } from "src/app/education/store/education.models";
import { ProjectItem } from "src/app/projects/store/projects.models";
import { ExperienceItem } from "src/app/experience/store/experience.models";
import { ProfileStoreService } from "src/app/profile/services/profile-store.service";
import { profileInitialState } from "src/app/profile/store/profile.reducer";
import { Profile } from "src/app/profile/store/profile.models";
import { MEDIA_QUERIES } from "src/app/shared/constants/breakpoints.constants";
import { BreakpointObserver } from "@angular/cdk/layout";
import { ThemeService } from "src/app/core/services/theme.service";

@Component({
  selector: "app-roadmap",
  templateUrl: "./roadmap.component.html",
  styleUrls: ["./roadmap.component.scss"],
})
export class RoadmapComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public theme$: Observable<"light" | "dark" | undefined>;
  public currentTheme: "light" | "dark" | undefined;
  public isMobileDevice = false;
  public user: Profile;
  public roadmap: Roadmap;
  public stack: any = {};
  public languageFilterConfig: IStackItem[] = [];
  public education: EducationItem[] = [];
  public experience: ExperienceItem[] = [];
  public projects: ProjectItem[] = [];
  public github: Github | undefined;
  public developerStacks: IStack[] = DEV_STACKS;
  public customStack: IStack = CUSTOM_STACK;
  public userStack: IStack | undefined;
  public stackList: any = {};

  constructor(
    private roadmapStoreService: RoadmapStoreService,
    private profileStoreService: ProfileStoreService,
    private breakpointObserver: BreakpointObserver,
    private themeService: ThemeService
  ) {
    this.theme$ = this.themeService.selectedTheme;
  }

  ngOnInit(): void {
    this.getUser();
    this.getRoadmap();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getUser() {
    this.profileStoreService
      .getProfile()
      .pipe(
        filter((state) => state != profileInitialState),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((user: Profile) => {
        this.user = user;

        if (this.githubRemoved()) {
          this.removeGithubData();
        }
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

    this.theme$.subscribe((theme: "light" | "dark" | undefined) => {
      this.currentTheme = theme;
    });
  }

  getRoadmap() {
    this.roadmapStoreService
      .getRoadmap()
      .pipe(
        filter((state) => state != roadmapInitialState),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        next: (roadmap: Roadmap) => {
          this.roadmap = roadmap;

          this.education = this.roadmap.education;
          this.experience = this.roadmap.experience;
          this.projects = this.roadmap.projects;

          if (this.roadmap.github) {
            this.github = this.roadmap.github;
          }

          if (this.roadmap?.stack) {
            this.getUserStack(this.roadmap.stack);
          }

          if (this.education.length || this.projects.length) {
            this.stack = this.extractStackData({
              education: this.education,
              projects: this.projects,
            });
          }
          if (
            this.education.length ||
            this.projects.length ||
            this.experience.length
          ) {
            this.stackList = this.extractStackData({
              education: this.education,
              projects: this.projects,
              experience: this.experience,
            });

            this.languageFilterConfig = this.extractLanguageFilterConfig({
              education: this.education,
              projects: this.projects,
              experience: this.experience,
            });
          }

          if (this.githubRemoved()) {
            this.removeGithubData();
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getUserStack(stack: IDeveloperStack): void {
    this.userStack = [...this.developerStacks, this.customStack].find(
      (item) => item.type.id === stack.id
    );
  }

  extractLanguageFilterConfig(data: any): IStackItem[] {
    const stack: any = [];
    for (const section in data) {
      data[section].forEach((item: any) => {
        item.stack.forEach((language: IStackItem) => {
          if (!stack.find((curr: any) => curr.name === language.name)) {
            stack.push(language);
          }
        });
      });
    }
    return stack;
  }

  extractStackData(data: any) {
    const stack: any = [];
    for (const section in data) {
      data[section].forEach((item: any) => {
        item.stack.forEach((language: any) => {
          if (!stack[language.name]) {
            stack[language.name] = { count: 0, language };
          }
          stack[language.name].count++;
        });
      });
    }

    return stack;
  }

  updateRoadmap(data: any) {
    if (data.path && data.stack) {
      this.roadmapStoreService.updateRoadmap({
        path: data.path,
        stack: data.stack,
      });
    }
  }

  githubRemoved(): boolean {
    if (this.user && this.roadmap) {
      if (this.user.github?.id === "" && !!this.roadmap.github) {
        return true;
      }
    }
    return false;
  }

  removeGithubData() {
    this.github = undefined;
  }
}
