import { props, createAction } from "@ngrx/store";
import { Recommendation, RemoteJob } from "./recommendations.models";

export const GET_RECOMMENDATIONS = "[Education] Get Recommendations";
export const GET_REMOTE_JOBS = "[Education] Get Remote Jobs";

const GET_RECOMMENDATIONS_SUCCESS = "[Education] Get Recommendations Success",
  GET_RECOMMENDATIONS_ERROR = "[Education] Get Recommendations Error",
  GET_REMOTE_JOBS_SUCCESS = "[Education] Get Remote Jobs Success",
  GET_REMOTE_JOBS_ERROR = "[Education] Get Remote Jobs Error";

export const GetRecommendations = createAction(GET_RECOMMENDATIONS);

export const GetRecommendationsSuccess = createAction(
  GET_RECOMMENDATIONS_SUCCESS,
  props<{ payload: Recommendation[] }>()
);

export const GetRecommendationsError = createAction(
  GET_RECOMMENDATIONS_ERROR,
  props<{ payload: string }>()
);

export const GetRemoteJobs = createAction(GET_REMOTE_JOBS);

export const GetRemoteJobsSuccess = createAction(
  GET_REMOTE_JOBS_SUCCESS,
  props<{ payload: RemoteJob[] }>()
);

export const GetRemoteJobsError = createAction(
  GET_REMOTE_JOBS_ERROR,
  props<{ payload: string }>()
);
