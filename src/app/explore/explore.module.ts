import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { ExploreService } from "./services/explore.service";
import { ExploreRoutingModule } from "./explore-routing.module";
import { ExploreComponent } from "./components/explore/explore.component";

@NgModule({
  declarations: [ExploreComponent],
  exports: [],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forChild(),
    ExploreRoutingModule,
    SharedModule,
  ],
  providers: [ExploreService],
})
export class ExploreModule {}
