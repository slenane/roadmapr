import { NgModule } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { MaterialModule } from "../material/material.module";
import { LandingComponent } from "./components/landing/landing.component";
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
import { RedirectComponent } from "./components/redirect/redirect.component";
// import { OAuthService } from "./services/o-auth.service";
import { ExtUrlResolverService } from "./services/ext-url-resolver.service";
import { CoreModule } from "../core/core.module";

@NgModule({
  declarations: [
    LandingComponent,
    LogInComponent,
    RegisterComponent,
    GitAuthComponent,
    RedirectComponent,
  ],
  exports: [
    LandingComponent,
    LogInComponent,
    RegisterComponent,
    GitAuthComponent,
    RedirectComponent,
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
  ],
  providers: [
    ExtUrlResolverService,
    // OAuthService,
    AuthService,
    AuthStoreService,
  ],
})
export class AuthModule {}
