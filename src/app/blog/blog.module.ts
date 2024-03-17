import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "../core/core.module";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { BlogRoutingModule } from "./blog-routing.module";
import { BlogComponent } from './components/blog/blog.component';
import { BlogItemComponent } from './components/blog-item/blog-item.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';

@NgModule({
  declarations: [
    BlogComponent,
    BlogItemComponent,
    BlogCardComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    TranslateModule.forChild(),
    BlogRoutingModule,
  ],
  providers: [],
})
export class BlogModule {}
