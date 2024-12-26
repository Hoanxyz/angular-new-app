export interface Event {
  title: string;
  content: string;
  time: string;
  images: Array<string>;
  thumbnail: string;
}

export interface Avatar {
  normal: string;
  special: string;
}

export interface User {
  code: string;
  fullName: string;
  avatar: Avatar;
}

export interface PageAble {
  page: number;
  size: number;
  textSearch?: string;
  searchType?: string;
  ids?: number[];
  userId?: number | null;
  collectionId?: number | null;
}

export interface IUrl {
  title: string;
  url: string;
  icon?: string
}

export interface ITabsSidebar {
  title: string;
  tab: string;
}
