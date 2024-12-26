import {Component, Input, OnInit} from '@angular/core';
import {PageAble} from "../../../../shared/models/models";
import {MusicService} from "../../shared/services/music.service";
import {MusicSharedService} from "../../shared/services/music-shared.service";
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../../shared/services/services.service";
import {ListPlay} from "../../shared/constants/music.constant";
import {IListPlay, ISongResponse} from "../../shared/models/music-models";
import {AlertDialogComponent} from "../../../../shared/components/alert-dialog/alert-dialog.component";
import {objectsHaveSamePropertiesAndValues} from "../../shared/utils/utils";

@Component({
  selector: 'app-song-table',
  templateUrl: './song-table.component.html',
  styleUrls: ['./song-table.component.scss']
})
export class SongTableComponent implements OnInit {
  @Input() pageAble!: PageAble;
  @Input() showDelete = true;
  @Input() playFromList = {
    type: ListPlay.ALL,
    name: 'Tất cả bài hát',
    id: null
  };
  @Input() classAdd = "";
  @Input() apiUrl = 'song/search-songs';
  listSongs: ISongResponse[] = [];
  totalSongs!: number;
  listFavSongs: number[] = [];
  isLogged = false;
  userId = -1;
  listPlay = ListPlay;
  currentSongPlay = 0;
  currentListPlay!: IListPlay;
  collections: any;
  sameListPlay = objectsHaveSamePropertiesAndValues;

  constructor(
    private musicService: MusicService,
    private sharedService: MusicSharedService,
    public dialog: MatDialog,
    public apiService: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.searchSong();
    this.isLogged = !!this.apiService.getCurrentUser();
    if (this.isLogged) {
      this.userId = this.apiService.getCurrentUser().id;
      this.updateListFavSongs();
      this.listenChangeCollection();
      this.sharedService.addToFav$.subscribe(() => {
        this.updateListFavSongs();
        if (this.pageAble.searchType === ListPlay.FAV) {
          this.searchSong();
        }
      });
      this.sharedService.collectionChange$.subscribe(() => {
        this.listenChangeCollection();
      });
    } else {
      localStorage.removeItem('songCollections');
    }

    this.sharedService.playSongAuto$.subscribe(data => {
      this.currentSongPlay = data;
      // @ts-ignore
      this.currentListPlay = JSON.parse(localStorage.getItem("listPlay"));
    });

    this.sharedService.playSong$.subscribe(data => {
      // @ts-ignore
      this.currentListPlay = JSON.parse(localStorage.getItem("listPlay"));
    });
  }

  listenChangeCollection(): void {
    this.musicService.userSongCollection(this.userId).subscribe(
      (res: any) => {
        localStorage.setItem('songCollections', JSON.stringify(res));
        this.displayCollection();
        this.searchSong();
      },
      (err: any) => {
        localStorage.removeItem('songCollections');
      }
    )
  }

  displayCollection(): void {
    this.collections = this.musicService.getCollectionsStorage();
  }

  updateListFavSongs(): void {
    this.musicService.findFavSongIdsByUserId(this.userId).subscribe(
      (res) => {
        this.listFavSongs = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }


  searchSong() {
    this.musicService.searchSongs(this.pageAble, this.apiUrl).subscribe(
      (res) => {
        this.listSongs = res.content;
        this.totalSongs = res.totalElements;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  playSong(id: number) {
    localStorage.setItem("listPlay", JSON.stringify(this.playFromList));
    this.sharedService.emitPlaySongEvent(id);
  }

  changePage(evt: any) {
    this.pageAble.page = evt.pageIndex;
    this.pageAble.size = evt.pageSize;
    this.searchSong();
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {title: 'Xác nhận xóa'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.musicService.deleteSong(id).subscribe(
          (res) => {
            this.sharedService.emitReloadListSongsEvent(true);
            this.sharedService.emmitAddToFav();
          }
        );
      }
    });
  }

  addToFavor(id: number) {
    const data = {
      userId: this.userId,
      songId: id
    }
    if (this.listFavSongs.includes(id)) {
      this.musicService.deleteFav(data).subscribe(
        (res) => {
          this.sharedService.emmitAddToFav();
        },
        (err) => {
          console.log(err);
        }
      )
    } else {
      this.musicService.addToFav(data).subscribe(
        (res) => {
          this.sharedService.emmitAddToFav();
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }

  isFav(id: number): boolean {
    return this.listFavSongs.includes(id);
  }

  downloadSong(id: number) {
    let blobUrl = '';
    let songPlayingName = '';
    const link = document.createElement("a");
    this.musicService.getSong(id).subscribe(
      (res) => {
        const contentDisposition = res.headers.get('content-disposition');
        const subString = contentDisposition.split('=')[2];
        songPlayingName = subString.replace(/\\/g, '').replace(/"/g, '');
        const blob = new Blob([res.body], { type: "audio/mp3" });
        blobUrl = URL.createObjectURL(blob);
        link.href = blobUrl;
        link.download = songPlayingName;
        link.click();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleAddToCollection(collectionId: any, songId: any): void {
    this.musicService.handleAddToCollection({collectionId, songId}).subscribe(
      (res: any) => {
        this.sharedService.emmitCollectionChange();
      },
      (err: any) => {
        this.dialog.open(AlertDialogComponent, {
          data: {
            content: err
          }
        });
      }
    )
  }

  isInCollection(collectionId: any, songId: any): boolean {
    const currentCollection = this.musicService.getCollectionsStorage().find((i: any) => i.id == collectionId);
    return currentCollection?.songs.some((i: any) => i.songId == songId);
  }
}
