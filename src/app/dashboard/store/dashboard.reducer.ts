import { Dashboard } from "./dashboard.models";
import * as DashboardActions from "./dashboard.actions";
import { createReducer, on } from "@ngrx/store";

interface Action {
  type: string;
}

const initialState: Dashboard = {
  education: [],
  employment: [],
  projects: [],
  github: [],
};

const DashboardReducer = createReducer(
  initialState,
  on(DashboardActions.GetDashboardSuccess, (state, { payload }) => {
    return { ...state, ...payload };
  }),
  on(DashboardActions.ResetState, () => initialState)
);

export const reducer = (state: Dashboard | undefined, action: Action) => {
  return DashboardReducer(state, action);
};

export const getDashboard = (state: Dashboard) => state;
