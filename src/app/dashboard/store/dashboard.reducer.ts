import { Dashboard } from "./dashboard.models";
import * as DashboardActions from "./dashboard.actions";
import { createReducer, on } from "@ngrx/store";

interface Action {
  type: string;
}

const initialState: Dashboard = {
  roadmap: {
    books: [],
    courses: [],
    degrees: [],
    tutorials: [],
    user: "",
    _id: "",
  },
  employment: {
    employmentList: [],
    user: "",
    _id: "",
  },
  projects: {
    projectList: [],
    user: "",
    _id: "",
  },
  github: [],
};

const DashboardReducer = createReducer(
  initialState,
  on(DashboardActions.GetDashboardSuccess, (state, { payload }) => {
    return { ...state, ...payload };
  })
);

export const reducer = (state: Dashboard | undefined, action: Action) => {
  return DashboardReducer(state, action);
};

export const getDashboard = (state: Dashboard) => state;
