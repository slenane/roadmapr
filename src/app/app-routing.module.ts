import { NgModule } from "@angular/core";
import {
  RouterModule,
  Routes,
  RouterStateSnapshot,
  TitleStrategy,
} from "@angular/router";
import { AuthGuardService } from "./auth-guard.service";
import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { RedirectComponent } from "./core/components/redirect/redirect.component";
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
    path: "redirect",
    component: RedirectComponent,
    title: "ROUTES.REDIRECT",
  },
  {
    path: "onboarding",
    loadChildren: () =>
      import("./onboarding/onboarding.module").then((m) => m.OnboardingModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "roadmap",
    loadChildren: () =>
      import("./roadmap/roadmap.module").then((m) => m.RoadmapModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "education",
    loadChildren: () =>
      import("./education/education.module").then((m) => m.EducationModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "projects",
    loadChildren: () =>
      import("./projects/projects.module").then((m) => m.ProjectsModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "experience",
    loadChildren: () =>
      import("./experience/experience.module").then((m) => m.ExperienceModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfileModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./settings/settings.module").then((m) => m.SettingsModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "page-not-found",
    component: PageNotFoundComponent,
    title: "ROUTES.PAGE_NOT_FOUND",
  },
  { path: "**", pathMatch: "full", redirectTo: "/page-not-found" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
