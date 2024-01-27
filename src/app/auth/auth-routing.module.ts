import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./components/landing/landing.component";
import { GitAuthComponent } from "src/app/auth/components/git-auth/git-auth.component";
import { ExtUrlResolverService } from "src/app/auth/services/ext-url-resolver.service";
import { LogInComponent } from "./components/log-in/log-in.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { SendResetPasswordEmailComponent } from "./components/send-reset-password-email/send-reset-password-email.component";
import { RegisterComponent } from "./components/register/register.component";
import { RedirectComponent } from "./components/redirect/redirect.component";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: LandingComponent,
    title: "ROUTES.LANDING",
    canActivate: [AuthGuard],
    data: {
      preAuthRoute: true,
    },
  },
  {
    path: "login",
    component: LogInComponent,
    title: "ROUTES.LOGIN",
    canActivate: [AuthGuard],
    data: {
      preAuthRoute: true,
    },
  },
  {
    path: "register",
    component: RegisterComponent,
    title: "ROUTES.REGISTER",
    canActivate: [AuthGuard],
    data: {
      preAuthRoute: true,
    },
  },
  {
    path: "send-reset-password-email",
    component: SendResetPasswordEmailComponent,
    title: "ROUTES.SEND_RESET_PASSWORD_EMAIL",
    canActivate: [AuthGuard],
    data: {
      preAuthRoute: true,
    },
  },
  {
    path: "reset-password",
    component: ResetPasswordComponent,
    title: "ROUTES.RESET_PASSWORD",
    canActivate: [AuthGuard],
    data: {
      preAuthRoute: true,
    },
  },
  {
    path: "github-auth",
    component: GitAuthComponent,
    resolve: {
      url: ExtUrlResolverService,
    },
  },
  {
    path: "redirect",
    component: RedirectComponent,
    title: "ROUTES.REDIRECT",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AuthRoutingModule {}
