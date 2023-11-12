import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ExperienceComponent } from "./components/experience.component";

const routes: Routes = [
  {
    path: "",
    component: ExperienceComponent,
    title: "ROUTES.EXPERIENCE",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExperienceRoutingModule {}
