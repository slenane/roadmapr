import * as recommendationsActions from "./recommendations.actions";
import { createReducer, on } from "@ngrx/store";
import { Recommendation } from "./recommendations.models";

interface Action {
  type: string;
}

export const recommendationsInitialState: Recommendation[] = [];

const recommendationsReducer = createReducer(
  recommendationsInitialState,
  on(recommendationsActions.GetRecommendationsSuccess, (state, { payload }) => {
    return [...state, ...payload];
  })
);

export const reducer = (state: Recommendation[], action: Action) => {
  return recommendationsReducer(state, action);
};

export const getRecommendations = (state: Recommendation[]) => state;
