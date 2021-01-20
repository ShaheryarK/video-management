import { Video } from "./video";

export interface NestedCategory {
  id:string;
  title:string;
  videos:Video[];
  children:NestedCategory[];
  parent:NestedCategory;
}


