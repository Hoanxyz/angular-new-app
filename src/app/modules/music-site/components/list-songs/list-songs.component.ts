import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MusicService} from "../../shared/services/music.service";
import {PageAble} from "../../../../shared/models/models";
import {SongTableComponent} from "../song-table/song-table.component";
import {MusicSharedService} from "../../shared/services/music-shared.service";
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent} from "../../../../shared/components/alert-dialog/alert-dialog.component";
import {ListPlay} from "../../shared/constants/music.constant";
import {FormBuilder, Validators} from "@angular/forms";
import {CommonValidators} from "../../../../shared/validators/common-validator";

@Component({
  selector: 'app-list-songs',
  templateUrl: './list-songs.component.html',
  styleUrls: ['./list-songs.component.scss']
})

export class ListSongsComponent implements OnInit, AfterViewInit {
  @ViewChild(SongTableComponent) songTable!: SongTableComponent;
  @ViewChild('uploadSong') uploadSong!: ElementRef<HTMLInputElement>;
  selectedFile: any;
  listPlay = {
    type: ListPlay.ALL,
    name: 'Tất cả bài hát',
    id: null
  };
  pageAble: PageAble = {
    searchType: "ALL",
    page: 0,
    size: 5,
    textSearch: ''
  }
  formUpload = this.fb.group({
    file: [null],
  });

  constructor(
    private musicService: MusicService,
    private sharedService: MusicSharedService,
    public dialog: MatDialog,
    public fb: FormBuilder
  ) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.sharedService.reloadListSongs$.subscribe(data => {
      if (data) {
        this.songTable.searchSong();
      }
    })

    this.musicService.getPosts().subscribe(
      (res) => {
      },
      (err) => {
        console.log(err);
      }
    )
  }

  onInputExcelFilePicked(event: Event, uploadSong: any): void {
    // @ts-ignore
    this.selectedFile = (event?.target as HTMLInputElement).files[0];
  uploadSong.value = '';
    // @ts-ignore
    this.formUpload.get('name').patchValue(this.selectedFile.name);
    // @ts-ignore
    this.formUpload.get('type').patchValue(this.selectedFile.type);
    // @ts-ignore
    this.formUpload.get('size').patchValue(this.selectedFile.size);
    console.log(this.formUpload);
    this.formUpload.markAllAsTouched();
  }

  onUpload(): void {
    this.formUpload.markAllAsTouched();
    if (this.formUpload.valid) {
      const formData = new FormData();
      if (this.formUpload.get('file')?.value) {
        // @ts-ignore
        formData.append('file', this.formUpload.get('file')?.value);

        this.musicService.uploadSong(formData).subscribe(
          (response) => {
            this.songTable.searchSong();
            this.uploadSong.nativeElement.value = "";
            this.selectedFile = null;
            this.dialog.open(AlertDialogComponent, {
              data: {
                content: 'Upload bài hát thành công'
              }
            });
          },
          (error) => {
            this.dialog.open(AlertDialogComponent, {
              data: {
                content: error
              }
            });
          }
        );
      }
    }
  }
}
