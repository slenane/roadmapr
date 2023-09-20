import { NgModule } from "@angular/core";
import { UrlService } from "./services/url.service";
import { ApiService } from "./services/api.service";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { AuthStoreService } from "../auth/services/auth-store.service";
import { HttpInterceptProviders } from "./services/http-interceptors";
import { DropListService } from "./services/drop-list.service";

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [
    AuthStoreService,
    UrlService,
    ApiService,
    DropListService,
    HttpInterceptProviders,
  ],
})
export class CoreModule {}
