import { props, createAction } from "@ngrx/store";
import { Recommendation } from "./recommendations.models";

export const GET_RECOMMENDATIONS = "[Education] Get Recommendations";

const GET_RECOMMENDATIONS_SUCCESS = "[Education] Get Recommendations Success",
  GET_RECOMMENDATIONS_ERROR = "[Education] Get Recommendations Error";

export const GetRecommendations = createAction(GET_RECOMMENDATIONS);

export const GetRecommendationsSuccess = createAction(
  GET_RECOMMENDATIONS_SUCCESS,
  props<{ payload: Recommendation[] }>()
);

export const GetRecommendationsError = createAction(
  GET_RECOMMENDATIONS_ERROR,
  props<{ payload: string }>()
);
