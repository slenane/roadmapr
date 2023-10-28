import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { LandingComponent } from "./components/landing/landing.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { CoreModule } from "../core/core.module";
import { HomeRoutingModule } from "./home-routing.module";
import { BlogComponent } from "./components/blog/blog.component";
import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";
import { AuthModule } from "../auth/auth.module";

@NgModule({
  declarations: [
    LandingComponent,
    BlogComponent,
    AboutComponent,
    ContactComponent,
  ],
  exports: [LandingComponent],
  imports: [
    AuthModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    TranslateModule.forChild(),
    HomeRoutingModule,
  ],
})
export class HomeModule {}
