import { Roadmap } from "./roadmap.models";
import * as roadmapActions from "./roadmap.actions";
import { createReducer, on } from "@ngrx/store";

interface Action {
  type: string;
}

const initialState: Roadmap = {
  books: [],
  courses: [],
  degrees: [],
  tutorials: [],
  user: "",
  _id: "",
};

const roadmapReducer = createReducer(
  initialState,
  on(roadmapActions.GetRoadmapSuccess, (state, { payload }) => {
    return { ...state, ...payload };
  }),
  on(roadmapActions.CreateRoadmapItemSuccess, (state: any, data: any) => {
    return { ...state, ...data.payload };
  }),
  on(roadmapActions.UpdateRoadmapItemSuccess, (state: any, data: any) => {
    return { ...state, ...data.payload };
  }),
  on(roadmapActions.RemoveRoadmapItemSuccess, (state: any, data: any) => {
    return { ...state, ...data.payload };
  })
);

export const reducer = (state: Roadmap | undefined, action: Action) => {
  return roadmapReducer(state, action);
};

export const getRoadmap = (state: Roadmap) => state;
