import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BlogComponent } from "./components/blog/blog.component";
import { BlogItemComponent } from "./components/blog-item/blog-item.component";

const routes: Routes = [
  {
    path: "",
    component: BlogComponent,
    title: "ROUTES.BLOG",
  },
  {
    path: "blog/:id",
    component: BlogItemComponent,
    title: "ROUTES.BLOG",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
