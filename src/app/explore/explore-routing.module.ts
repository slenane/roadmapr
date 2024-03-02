import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ExploreComponent } from "./components/explore/explore.component";
import { AuthGuard } from "../auth/services/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: ExploreComponent,
    title: "ROUTES.EXPLORE",
    canActivate: [AuthGuard],
    data: {
      preAuthRoute: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreRoutingModule {}
