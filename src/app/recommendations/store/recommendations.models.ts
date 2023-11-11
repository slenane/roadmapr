import { StackItem } from "src/app/shared/store/stack.models";

export interface Recommendation {
  description?: String;
  link?: String;
  stack?: StackItem[];
  paths: any;
  locations: any;
  nationalities: any;
  title: String;
  provider: String;
  count: Number;
  recommended: Number;
  percentageRecommended?: Number;
  _id: string;
}
