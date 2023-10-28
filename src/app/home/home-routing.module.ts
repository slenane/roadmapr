import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./components/landing/landing.component";
import { BlogComponent } from "./components/blog/blog.component";
import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";
import { GitAuthComponent } from "src/app/auth/components/git-auth/git-auth.component";
import { ExtUrlResolverService } from "src/app/auth/services/ext-url-resolver.service";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: LandingComponent,
  },
  {
    path: "login",
    component: LandingComponent,
    title: "ROUTES.LOGIN",
  },
  {
    path: "send-reset-password-email",
    component: LandingComponent,
    title: "ROUTES.SEND_RESET_PASSWORD_EMAIL",
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
    path: "blog",
    component: BlogComponent,
    title: "ROUTES.BLOG",
  },
  {
    path: "about",
    component: AboutComponent,
    title: "ROUTES.ABOUT",
  },
  {
    path: "contact",
    component: ContactComponent,
    title: "ROUTES.CONTACT",
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
export class HomeRoutingModule {}
