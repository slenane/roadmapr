import { NgModule } from "@angular/core";
import { UrlService } from "./services/url.service";
import { ApiService } from "./services/api.service";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { AuthStoreService } from "../auth/services/auth-store.service";
import { HttpInterceptProviders } from "./services/http-interceptors";
import { RedirectComponent } from "../auth/components/redirect/redirect.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [RedirectComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    TranslateModule.forChild(),
  ],
  providers: [AuthStoreService, UrlService, ApiService, HttpInterceptProviders],
})
export class CoreModule {}
