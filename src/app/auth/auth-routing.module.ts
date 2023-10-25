import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./components/landing/landing.component";
import { GitAuthComponent } from "./components/git-auth/git-auth.component";
import { ExtUrlResolverService } from "./services/ext-url-resolver.service";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login",
  },
  {
    path: "login",
    component: LandingComponent,
    title: "ROUTES.LOGIN",
  },
  {
    path: "reset-password",
    component: LandingComponent,
    title: "ROUTES.RESET_PASSWORD",
  },
  {
    path: "register",
    component: LandingComponent,
    title: "ROUTES.REGISTER",
  },
  {
    path: "github-auth",
    component: GitAuthComponent,
    resolve: {
      url: ExtUrlResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
