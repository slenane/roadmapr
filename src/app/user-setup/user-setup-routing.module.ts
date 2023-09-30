import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserSetupComponent } from "./components//user-setup.component";

const routes: Routes = [
  {
    path: "",
    component: UserSetupComponent,
    title: "ROUTES.USER_SETUP",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSSetupRoutingModule {}
