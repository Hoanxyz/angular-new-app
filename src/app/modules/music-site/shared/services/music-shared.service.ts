import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {ListPlay} from "../constants/music.constant";
import {IListPlay} from "../models/music-models";

@Injectable({
  providedIn: 'root'
})
export class MusicSharedService {
  private playSongEventSource =
    new BehaviorSubject<number>(-99);
  playSong$ = this.playSongEventSource.asObservable();

  private playSongAutoEventSource =
    new BehaviorSubject<number>(-99);
  playSongAuto$ = this.playSongAutoEventSource.asObservable();

  private reloadSongsEventResource = new BehaviorSubject<boolean>(false);
  reloadListSongs$ = this.reloadSongsEventResource.asObservable();

  private appendListSongsEventResource = new BehaviorSubject<IListPlay>({
    type: ListPlay.ALL,
    name: 'Tất cả bài hát',
    id: null
  });
  appendListSongs$ = this.appendListSongsEventResource.asObservable();

  private addToFavSource = new Subject<void>();
  addToFav$ = this.addToFavSource.asObservable();

  private collectionChangeSource = new Subject<void>();
  collectionChange$ = this.collectionChangeSource.asObservable();

  private newCollectionSource = new Subject<void>();
  newCollection$ = this.newCollectionSource.asObservable();


  constructor() { }

  emitPlaySongEvent(data: number): void {
    this.playSongEventSource.next(data);
  }

  emitPlaySongAutoEvent(data: number): void {
    this.playSongAutoEventSource.next(data);
  }

  emitReloadListSongsEvent(data: boolean): void {
    this.reloadSongsEventResource.next(data);
  }

  emitAppendListSongsEvent(data: IListPlay): void {
    this.appendListSongsEventResource.next(data);
  }

  emmitAddToFav() {
    this.addToFavSource.next();
  }

  emmitCollectionChange() {
    this.collectionChangeSource.next();
  }

  emmitNewCollection() {
    this.newCollectionSource.next();
  }
}
