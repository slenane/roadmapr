import { Action } from "@ngrx/store";
import { Roadmap, Book, Course, Degree, Tutorial } from "./roadmap.models";

export enum RoadmapActionTypes {
  GET_ROADMAP = "[Roadmap] Get Roadmap",
  GET_ROADMAP_SUCCESS = "[Roadmap] Roadmap Loaded Successfully",

  //   GET_ROADMAP_ITEM = "[Roadmap] Get Roadmap Item",
  //   GET_ROADMAP_ITEM_SUCCESS = "[Roadmap] Roadmap Item Loaded Successfully",

  //   ADD_ROADMAP_ITEM = "[Roadmap] Add Roadmap Item",
  //   ADD_ROADMAP_ITEM_SUCCESS = "[Roadmap] Roadmap Item Added SuccessFully",

  //   EDIT_ROADMAP_ITEM = "[Roadmap] Edit Roadmap Item",
  //   EDIT_ROADMAP_ITEM_SUCCESS = "[Roadmap] Roadmap Item Edited SuccessFully",

  //   REMOVE_ROADMAP_ITEM = "[Roadmap] Remove Roadmap Item",
  //   REMOVE_ROADMAP_ITEM_SUCCESS = "[Roadmap] Roadmap Item Removed SuccessFully",
}

export class GetRoadmap implements Action {
  readonly type = RoadmapActionTypes.GET_ROADMAP;
  constructor() {}
}

export class GetRoadmapSuccess implements Action {
  readonly type = RoadmapActionTypes.GET_ROADMAP_SUCCESS;
  constructor(public payload: Roadmap) {}
}

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

export type All = GetRoadmap | GetRoadmapSuccess;
//   | AddRoadmapItem
//   | AddRoadmapItemSuccess
//   | EditRoadmapItem
//   | EditRoadmapItemSuccess
//   | RemoveRoadmapItem
//   | RemoveRoadmapItemSuccess;
