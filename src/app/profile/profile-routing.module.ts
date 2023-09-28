import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfileComponent } from "./components/profile.component";

const routes: Routes = [
  {
    path: "",
    component: ProfileComponent,
    title: "ROUTES.PROFILE",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
