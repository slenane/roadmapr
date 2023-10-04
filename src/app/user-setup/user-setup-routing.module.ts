import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserSetupComponent } from "./components//user-setup.component";
import { UserSetupTourComponent } from "./components/user-setup-tour/user-setup-tour.component";

const routes: Routes = [
  {
    path: "",
    component: UserSetupComponent,
    title: "ROUTES.USER_SETUP",
  },
  {
    path: "tour",
    component: UserSetupTourComponent,
    title: "ROUTES.TOUR",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSSetupRoutingModule {}
