import * as recommendationsActions from "./recommendations.actions";
import { createReducer, on } from "@ngrx/store";
import { Recommendation, RemoteJob } from "./recommendations.models";

interface Action {
  type: string;
}

export const recommendationsInitialState: {
  recommendations: Recommendation[];
  remoteJobs: RemoteJob[];
} = {
  recommendations: [],
  remoteJobs: [],
};

const recommendationsReducer = createReducer(
  recommendationsInitialState,
  on(recommendationsActions.GetRecommendationsSuccess, (state, { payload }) => {
    return { ...state, recommendations: payload };
  }),
  on(recommendationsActions.GetRemoteJobsSuccess, (state, { payload }) => {
    return { ...state, remoteJobs: payload };
  })
);

export const reducer = (
  state: { recommendations: Recommendation[]; remoteJobs: RemoteJob[] },
  action: Action
) => {
  return recommendationsReducer(state, action);
};

export const getRecommendations = (state: {
  recommendations: Recommendation[];
  remoteJobs: RemoteJob[];
}) => state.recommendations;
export const getRemoteJobs = (state: {
  recommendations: Recommendation[];
  remoteJobs: RemoteJob[];
}) => state.remoteJobs;
