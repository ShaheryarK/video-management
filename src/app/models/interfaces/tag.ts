import { Video } from "./video";

export interface Tag{
  id?:string;
  name:string;
  videos?:Video[];
}
