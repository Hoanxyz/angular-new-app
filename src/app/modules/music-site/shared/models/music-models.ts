import {ListPlay} from "../constants/music.constant";

export interface ISongResponse {
  id: number;
  name: string;
}

export interface IListPlay {
  type: string;
  name: string;
  id?: any;
}

export interface ICollection {
  id: any;
  name: any;
  song: any;
}
