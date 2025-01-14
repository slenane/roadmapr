import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SettingsComponent } from "./components/settings.component";

const routes: Routes = [
  {
    path: "",
    component: SettingsComponent,
    title: "ROUTES.SETTINGS",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
