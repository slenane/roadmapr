import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OnboardingComponent } from "./components/onboarding.component";

const routes: Routes = [
  {
    path: "",
    component: OnboardingComponent,
    title: "ROUTES.ONBOARDING",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingRoutingModule {}
