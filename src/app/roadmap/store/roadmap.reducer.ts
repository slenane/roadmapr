import { Roadmap } from "./roadmap.models";
import { RoadmapActionTypes, All } from "./roadmap.actions";

export const RoadmapReducer = (state: Roadmap, action: All) => {
  switch (action.type) {
    case RoadmapActionTypes.GET_ROADMAP_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};
