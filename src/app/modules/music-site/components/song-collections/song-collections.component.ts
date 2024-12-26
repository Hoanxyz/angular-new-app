import {Component, Input, OnInit} from '@angular/core';
import {MusicService} from "../../shared/services/music.service";
import {ApiService} from "../../../../shared/services/services.service";
import {ListPlay} from "../../shared/constants/music.constant";
import {ICollection} from "../../shared/models/music-models";
import {MusicSharedService} from "../../shared/services/music-shared.service";
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-song-collections',
  templateUrl: './song-collections.component.html',
  styleUrls: ['./song-collections.component.scss']
})
export class SongCollectionsComponent implements OnInit {
  collections: ICollection[] = [];
  listPlay = ListPlay;
  @Input() showDelete = false;

  constructor(
    private musicService: MusicService,
    private apiService: ApiService,
    private sharedService: MusicSharedService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    if (this.apiService.getCurrentUser()) {
      this.collections = this.musicService.getCollectionsStorage();
      // console.log(this.collections);
    }

    this.sharedService.newCollection$.subscribe(() => {
      this.collections = this.musicService.getCollectionsStorage();
    });
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {title: 'Xác nhận xóa'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.musicService.deleteCollection(id).subscribe(
          (res) => {
            this.musicService.storageCollections();
          }
        );
      }
    });
  }
}
