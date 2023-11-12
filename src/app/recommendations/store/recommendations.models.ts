import { StackItem } from "src/app/shared/store/stack.models";

export interface Recommendation {
  internal: {
    provider: string;
    title: string;
  };
  description: string;
  link?: string;
  stack: StackItem[];
  paths: any;
  locations: any;
  nationalities: any;
  title: string;
  author: string;
  count: number;
  recommended: number;
  percentageRecommended: number;
  type: string;
  _id: string;
}