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

@NgModule({
  declarations: [LandingComponent, LogInComponent, RegisterComponent],
  exports: [LandingComponent, LogInComponent, RegisterComponent],
  imports: [FormsModule, ReactiveFormsModule, MaterialModule, SharedModule],
  providers: [AuthService, UrlService, ApiService],
})
export class CoreModule {}
