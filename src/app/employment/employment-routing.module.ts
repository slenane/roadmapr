import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EmploymentComponent } from "./components/employment.component";

const routes: Routes = [
  {
    path: "",
    component: EmploymentComponent,
    title: "ROUTES.EMPLOYMENT",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmploymentRoutingModule {}
