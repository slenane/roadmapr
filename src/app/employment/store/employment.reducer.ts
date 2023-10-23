import { Employment } from "./employment.models";
import * as employmentActions from "./employment.actions";
import { createReducer, on } from "@ngrx/store";

interface Action {
  type: string;
}

export const employmentInitialState: Employment = {
  employmentList: [],
  user: "",
  _id: "",
};

const employmentReducer = createReducer(
  employmentInitialState,
  on(employmentActions.GetEmploymentSuccess, (state, { payload }) => {
    return { ...state, ...payload };
  }),
  on(employmentActions.CreateEmploymentItemSuccess, (state: any, data: any) => {
    return { ...state, ...data.payload };
  }),
  on(employmentActions.UpdateEmploymentItemSuccess, (state: any, data: any) => {
    return { ...state, ...data.payload };
  }),
  on(
    employmentActions.BulkUpdateEmploymentItemsSuccess,
    (state: any, data: any) => {
      return { ...state, ...data.payload };
    }
  ),
  on(employmentActions.RemoveEmploymentItemSuccess, (state: any, data: any) => {
    return { ...state, ...data.payload };
  })
);

export const reducer = (state: Employment | undefined, action: Action) => {
  return employmentReducer(state, action);
};

export const getEmployment = (state: Employment) => state;
