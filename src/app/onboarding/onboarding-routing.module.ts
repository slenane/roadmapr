import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OnboardingComponent } from "./components/onboarding.component";
import { OnboardingTourComponent } from "./components/onboarding-tour/onboarding-tour.component";

const routes: Routes = [
  {
    path: "",
    component: OnboardingComponent,
    title: "ROUTES.ONBOARDING",
  },
  // {
  //   path: "tour",
  //   component: OnboardingTourComponent,
  //   title: "ROUTES.TOUR",
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingRoutingModule {}
