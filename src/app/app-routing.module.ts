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
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "redirect",
    component: RedirectComponent,
    title: "ROUTES.REDIRECT",
  },
  {
    path: "welcome",
    loadChildren: () =>
      import("./user-setup/user-setup.module").then((m) => m.UserSetupModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
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
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
