import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EducationComponent } from "./components/education.component";

const routes: Routes = [
  {
    path: "",
    component: EducationComponent,
    title: "ROUTES.EDUCATION",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EducationRoutingModule {}
