import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RoadmapComponent } from "./components/roadmap.component";

const routes: Routes = [
  {
    path: "",
    component: RoadmapComponent,
    title: "ROUTES.ROADMAP",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoadmapRoutingModule {}
