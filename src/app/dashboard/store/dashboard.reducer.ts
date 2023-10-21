import { Dashboard } from "./dashboard.models";
import * as DashboardActions from "./dashboard.actions";
import { createReducer, on } from "@ngrx/store";

interface Action {
  type: string;
}

export const dashboardInitialState: Dashboard = {
  education: [],
  employment: [],
  projects: [],
  github: [],
};

const DashboardReducer = createReducer(
  dashboardInitialState,
  on(DashboardActions.GetDashboardSuccess, (state, { payload }) => {
    return { ...state, ...payload };
  })
);

export const reducer = (state: Dashboard | undefined, action: Action) => {
  return DashboardReducer(state, action);
};

export const getDashboard = (state: Dashboard) => state;
