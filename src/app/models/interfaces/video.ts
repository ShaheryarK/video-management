import { NestedCategory } from "./category";
import { Tag } from "./tag";

export interface Video {
  id:string;
  name: string;
  video: Media;
  description:string;
  category: NestedCategory;
  tags: Tag[];
}

export interface Media {
  _id: string;
  name: string;
  alternativeText: string;
  caption: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  provider: string;
  width: number;
  height: number;
}

export class VideoEntry{
  name: string ="";
  description:string ="";
  category: string = "";
  tags:any[]=[];
}
