import { NgModule } from "@angular/core";
import {
  RouterModule,
  Routes,
  RouterStateSnapshot,
  TitleStrategy,
} from "@angular/router";
import { AuthGuard } from "./auth/services/auth.guard";
import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { PageNotFoundComponent } from "./core/components/page-not-found/page-not-found.component";

@Injectable()
export class CustomTitleStrategy extends TitleStrategy {
  constructor(
    private translateService: TranslateService,
    private readonly title: Title
  ) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title) {
      this.translateService.get(title).subscribe((translatedTitle) => {
        this.title.setTitle(translatedTitle);
      });
    } else {
      this.title.setTitle("roadmapr");
    }
  }
}

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "explore",
    loadChildren: () =>
      import("./explore/explore.module").then((m) => m.ExploreModule),
  },
  {
    path: "onboarding",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./onboarding/onboarding.module").then((m) => m.OnboardingModule),
  },
  {
    path: "roadmap",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./roadmap/roadmap.module").then((m) => m.RoadmapModule),
  },
  {
    path: "education",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./education/education.module").then((m) => m.EducationModule),
  },
  {
    path: "projects",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./projects/projects.module").then((m) => m.ProjectsModule),
  },
  {
    path: "experience",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./experience/experience.module").then((m) => m.ExperienceModule),
  },
  {
    path: "profile",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfileModule),
  },
  {
    path: "settings",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./settings/settings.module").then((m) => m.SettingsModule),
  },
  {
    path: "**",
    component: PageNotFoundComponent,
    title: "ROUTES.PAGE_NOT_FOUND",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
