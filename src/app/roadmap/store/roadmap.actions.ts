import { props, createAction } from "@ngrx/store";
import { Roadmap } from "./roadmap.models";

export const GET_ROADMAP = "[Roadmap] Get Roadmap";
const GET_ROADMAP_SUCCESS = "[Roadmap] Roadmap Loaded Successfully",
  GET_ROADMAP_ERROR = "[Auth] Registration Error";

export const GetRoadmap = createAction(GET_ROADMAP, props<{ id: number }>());

export const GetRoadmapSuccess = createAction(
  GET_ROADMAP_SUCCESS,
  props<{ payload: Roadmap }>()
);

export const GetRoadmapError = createAction(
  GET_ROADMAP_ERROR,
  props<{ payload: string }>()
);

// export enum RoadmapActionTypes {

//   GET_ROADMAP_ITEM = "[Roadmap] Get Roadmap Item",
//   GET_ROADMAP_ITEM_SUCCESS = "[Roadmap] Roadmap Item Loaded Successfully",

//   ADD_ROADMAP_ITEM = "[Roadmap] Add Roadmap Item",
//   ADD_ROADMAP_ITEM_SUCCESS = "[Roadmap] Roadmap Item Added SuccessFully",

//   EDIT_ROADMAP_ITEM = "[Roadmap] Edit Roadmap Item",
//   EDIT_ROADMAP_ITEM_SUCCESS = "[Roadmap] Roadmap Item Edited SuccessFully",

//   REMOVE_ROADMAP_ITEM = "[Roadmap] Remove Roadmap Item",
//   REMOVE_ROADMAP_ITEM_SUCCESS = "[Roadmap] Roadmap Item Removed SuccessFully",

// export class GetRoadmapItem implements Action {
//   readonly type = RoadmapActionTypes.GET_ROADMAP_ITEM;
//   constructor(public payload: Book | Course | Degree | Tutorial) {}
// }

// export class GetRoadmapItemSuccess implements Action {
//   readonly type = RoadmapActionTypes.GET_ROADMAP_ITEM_SUCCESS;
//   constructor(public payload: Book | Course | Degree | Tutorial) {}
// }

// export class AddRoadmapItem implements Action {
//   readonly type = RoadmapActionTypes.ADD_ROADMAP_ITEM;
//   constructor(public payload: Book | Course | Degree | Tutorial) {}
// }

// export class AddRoadmapItemSuccess implements Action {
//   readonly type = RoadmapActionTypes.ADD_ROADMAP_ITEM_SUCCESS;
//   constructor(public payload: Book | Course | Degree | Tutorial) {}
// }

// export class EditRoadmapItem implements Action {
//   readonly type = RoadmapActionTypes.EDIT_ROADMAP_ITEM;
//   constructor(public payload: Book | Course | Degree | Tutorial) {}
// }

// export class EditRoadmapItemSuccess implements Action {
//   readonly type = RoadmapActionTypes.EDIT_ROADMAP_ITEM_SUCCESS;
//   constructor(public payload: Book | Course | Degree | Tutorial) {}
// }

// export class RemoveRoadmapItem implements Action {
//   readonly type = RoadmapActionTypes.REMOVE_ROADMAP_ITEM;
//   constructor(public id: number) {}
// }

// export class RemoveRoadmapItemSuccess implements Action {
//   readonly type = RoadmapActionTypes.REMOVE_ROADMAP_ITEM_SUCCESS;
//   constructor(public payload: Book | Course | Degree | Tutorial) {}
// }
