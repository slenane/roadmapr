import { Education } from "./education.models";
import * as educationActions from "./education.actions";
import { createReducer, on } from "@ngrx/store";

interface Action {
  type: string;
}

const initialState: Education = {
  books: [],
  courses: [],
  degrees: [],
  tutorials: [],
  user: "",
  _id: "",
};

const educationReducer = createReducer(
  initialState,
  on(educationActions.GetEducationSuccess, (state, { payload }) => {
    return { ...state, ...payload };
  }),
  on(educationActions.CreateEducationItemSuccess, (state: any, data: any) => {
    return { ...state, ...data.payload };
  }),
  on(educationActions.UpdateEducationItemSuccess, (state: any, data: any) => {
    return { ...state, ...data.payload };
  }),
  on(educationActions.RemoveEducationItemSuccess, (state: any, data: any) => {
    return { ...state, ...data.payload };
  })
);

export const reducer = (state: Education | undefined, action: Action) => {
  return educationReducer(state, action);
};

export const getEducation = (state: Education) => state;
