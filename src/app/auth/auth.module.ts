import { NgModule } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { MaterialModule } from "../material/material.module";
import { LogInComponent } from "./components/log-in/log-in.component";
import { RegisterComponent } from "./components/register/register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { AuthStoreService } from "../auth/services/auth-store.service";
import { StoreModule } from "@ngrx/store";
import * as fromAuth from "./store/auth.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./store/auth.effects";
import { TranslateModule } from "@ngx-translate/core";
import { GitAuthComponent } from "../auth/components/git-auth/git-auth.component";
import { ExtUrlResolverService } from "./services/ext-url-resolver.service";
import { CoreModule } from "../core/core.module";
import { SendResetPasswordEmailComponent } from "./components/send-reset-password-email/send-reset-password-email.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { LandingComponent } from "./components/landing/landing.component";
import { AuthGuard } from "./services/auth.guard";

@NgModule({
  declarations: [
    LandingComponent,
    LogInComponent,
    RegisterComponent,
    GitAuthComponent,
    SendResetPasswordEmailComponent,
    ResetPasswordComponent,
  ],
  exports: [
    LogInComponent,
    RegisterComponent,
    GitAuthComponent,
    SendResetPasswordEmailComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    StoreModule.forFeature("auth", fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
    TranslateModule.forChild(),
    AuthRoutingModule,
  ],
  providers: [ExtUrlResolverService, AuthService, AuthStoreService, AuthGuard],
})
export class AuthModule {}
