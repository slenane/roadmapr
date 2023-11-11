import { StackItem } from "src/app/shared/store/stack.models";

export interface Recommendation {
  description?: string;
  link?: string;
  stack?: StackItem[];
  paths: any;
  locations: any;
  nationalities: any;
  title: string;
  provider: string;
  count: number;
  recommended: number;
  percentageRecommended?: number;
  type?: string;
  _id: string;
}
