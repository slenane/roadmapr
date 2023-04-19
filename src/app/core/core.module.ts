import { NgModule } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { UrlService } from "./services/url.service";
import { ApiService } from "./services/api.service";
import { MaterialModule } from "../material/material.module";
import { LandingComponent } from "./components/landing/landing.component";
import { LogInComponent } from "./components/log-in/log-in.component";
import { RegisterComponent } from "./components/register/register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { AuthStoreService } from "./services/auth-store.service";
import { StoreModule } from "@ngrx/store";
import * as fromAuth from "./store/auth.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./store/auth.effects";

@NgModule({
  declarations: [LandingComponent, LogInComponent, RegisterComponent],
  exports: [LandingComponent, LogInComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature("auth", fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthService, AuthStoreService, UrlService, ApiService],
})
export class CoreModule {}
