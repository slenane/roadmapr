import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";
import { Github } from "src/app/roadmap/store/roadmap.models";
import { STACK_LIST } from "src/app/shared/constants/stack-list.constants";
import { StackItem } from "src/app/shared/store/stack.models";

@Component({
  selector: "app-roadmap-github",
  templateUrl: "./roadmap-github.component.html",
  styleUrls: ["./roadmap-github.component.scss"],
})
export class RoadmapGithubComponent implements OnInit, OnChanges {
  public githubAuthUrl: string;
  public languages: StackItem[];
  public stack: StackItem[] = [...STACK_LIST];
  public created: string | undefined;
  public updated: string;

  @Input() data: Github | undefined;
  @Input() theme: "light" | "dark" | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.data.currentValue &&
      changes.data.currentValue != changes.data.previousValue
    ) {
      this.getStackList();
      this.getDates();
    }

    if (!changes?.data.currentValue) {
      this.initializeGithubAuth();
    }
  }

  getStackList() {
    this.languages = this.stack.filter((item: StackItem) => {
      const repoLanguages = this.data?.featuredRepo.languages;
      const itemTitleLower = item.title.toLowerCase();

      if (repoLanguages) {
        return Object.keys(repoLanguages).some((key) =>
          itemTitleLower.includes(key.toLowerCase())
        );
      }
      return;
    });
  }

  getDates() {
    if (this.data?.featuredRepo) {
      this.created = new Date(
        this.data.featuredRepo.createdAt
      ).toLocaleDateString("en-GB");
      this.updated = new Date(
        this.data.featuredRepo.updatedAt
      ).toLocaleDateString("en-GB");
    }
  }

  initializeGithubAuth() {
    this.authService.getGithubAuthPage().subscribe({
      next: (data: any) => (this.githubAuthUrl = data["authUrl"]),
      error: (err: any) => console.log(err),
    });
  }

  linkGithubAccount(): void {
    if (this.githubAuthUrl) {
      this.router.navigate(["/github-auth"], {
        queryParams: { url: this.githubAuthUrl },
      });
    }
  }
}
