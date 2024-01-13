import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./components/landing/landing.component";
import { GitAuthComponent } from "src/app/auth/components/git-auth/git-auth.component";
import { ExtUrlResolverService } from "src/app/auth/services/ext-url-resolver.service";
import { LogInComponent } from "./components/log-in/log-in.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { SendResetPasswordEmailComponent } from "./components/send-reset-password-email/send-reset-password-email.component";
import { RegisterComponent } from "./components/register/register.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: LandingComponent,
    title: "ROUTES.LANDING",
  },
  {
    path: "login",
    component: LogInComponent,
    title: "ROUTES.LOGIN",
  },
  {
    path: "register",
    component: RegisterComponent,
    title: "ROUTES.REGISTER",
  },
  {
    path: "send-reset-password-email",
    component: SendResetPasswordEmailComponent,
    title: "ROUTES.SEND_RESET_PASSWORD_EMAIL",
  },
  {
    path: "reset-password",
    component: ResetPasswordComponent,
    title: "ROUTES.RESET_PASSWORD",
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
