import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SongTableComponent} from "../song-table/song-table.component";
import {PageAble} from "../../../../shared/models/models";
import {ListPlay} from "../../shared/constants/music.constant";
import {ApiService} from "../../../../shared/services/services.service";

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit, AfterViewInit {
  @ViewChild(SongTableComponent) songTable!: SongTableComponent;
  listPlay = {
    type: ListPlay.FAV,
    name: 'Danh sách yêu thích',
    id: null
  };
  pageAble: PageAble = {
    searchType: "FAV",
    page: 0,
    size: 5,
    textSearch: '',
    ids: []
  }

  constructor(
    public apiService: ApiService,
  ) {
    if (this.apiService.getCurrentUser()) {
      this.pageAble.userId = this.apiService.getCurrentUser().id;
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
}
