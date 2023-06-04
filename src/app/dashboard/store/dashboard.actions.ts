import { props, createAction } from "@ngrx/store";
import { Dashboard } from "./dashboard.models";

export const GET_DASHBOARD = "[Dashboard] Get Dashboard";

const GET_DASHBOARD_SUCCESS = "[Dashboard] Dashboard Loaded Successfully",
  GET_DASHBOARD_ERROR = "[Dashboard] Dashboard Load Error";

export const GetDashboard = createAction(
  GET_DASHBOARD,
  props<{ id: string }>()
);

export const GetDashboardSuccess = createAction(
  GET_DASHBOARD_SUCCESS,
  props<{ payload: Dashboard }>()
);

export const GetDashboardError = createAction(
  GET_DASHBOARD_ERROR,
  props<{ payload: string }>()
);
