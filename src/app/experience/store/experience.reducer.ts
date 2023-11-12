import { Experience } from "./experience.models";
import * as experienceActions from "./experience.actions";
import { createReducer, on } from "@ngrx/store";

interface Action {
  type: string;
}

export const experienceInitialState: Experience = {
  experienceList: [],
  user: "",
  _id: "",
};

const experienceReducer = createReducer(
  experienceInitialState,
  on(experienceActions.GetExperienceSuccess, (state, { payload }) => {
    return { ...state, ...payload };
  }),
  on(experienceActions.CreateExperienceItemSuccess, (state: any, data: any) => {
    return { ...state, ...data.payload };
  }),
  on(experienceActions.UpdateExperienceItemSuccess, (state: any, data: any) => {
    return { ...state, ...data.payload };
  }),
  on(
    experienceActions.BulkUpdateExperienceItemsSuccess,
    (state: any, data: any) => {
      return { ...state, ...data.payload };
    }
  ),
  on(experienceActions.RemoveExperienceItemSuccess, (state: any, data: any) => {
    return { ...state, ...data.payload };
  })
);

export const reducer = (state: Experience | undefined, action: Action) => {
  return experienceReducer(state, action);
};

export const getExperience = (state: Experience) => state;
