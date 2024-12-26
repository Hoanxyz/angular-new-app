import {Component, ElementRef, ViewChild} from '@angular/core';
import {PageAble} from "../../../../shared/models/models";
import {SongTableComponent} from "../song-table/song-table.component";
import {FormBuilder, Validators} from "@angular/forms";
import {SharedService} from "../../../../shared/services/shared.service";
import {ListPlay} from "../../shared/constants/music.constant";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @ViewChild(SongTableComponent) songTable!: SongTableComponent;
  listPlay = {
    type: ListPlay.SEARCH,
    name: 'Tất cả bài hát',
    id: null
  };
  pageAble: PageAble = {
    searchType: "SEARCH",
    page: 0,
    size: 5,
    textSearch: ''
  }

  formSearch = this.fb.group({
    songName: ['']
  })

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService
  ) {
  }

  searchSong() {
    if (!this.formSearch.get('songName')?.value) {
      return;
    }
    // @ts-ignore
    this.pageAble.textSearch = this.formSearch.get("songName")?.value;
    this.songTable.searchSong();
  }

  closeSearch() {
    this.sharedService.emmitToggleSearch();
  }
}
