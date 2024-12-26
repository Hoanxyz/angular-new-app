import {Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import {ListPlay} from "../../shared/constants/music.constant";
import {SharedService as RootSharedService} from "../../../../shared/services/shared.service";
import {MusicSharedService} from "../../shared/services/music-shared.service";
import {ApiService} from "../../../../shared/services/services.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MusicService} from "../../shared/services/music.service";

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  window = window;
  formData = this.fb.group({
    money: [null, [Validators.required]]
  })
  currentUser: any;

  constructor(
    private router: Router,
    private musicService: MusicService,
    private sharedService: MusicSharedService,
    private rootShareService: RootSharedService,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.apiService.checkTokenValid().subscribe(
      (res) => {
      },
      (error) => {
        // console.log(error);
        if(error.status == '403') {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('authToken');
        }
      }
    )
    this.rootShareService.logout$.subscribe(
      () => {
        this.sharedService.emitPlaySongEvent(-99);
        localStorage.removeItem('songCollections');
      }
    );

    this.rootShareService.login$.subscribe(
      () => {
        this.musicService.storageCollections();
      }
    );

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        pairwise()
      )
      .subscribe((event: any[]) => {
      });
  }

  ngOnInit(): void {
    this.currentUser = this.apiService.getCurrentUser();

    const defaultListPlay = {
      type: ListPlay.ALL,
      name: 'Tất cả bài hát',
      id: null
    };
    localStorage.setItem("listPlay", JSON.stringify(defaultListPlay));
    const currentUrl = window.location.href;
    if (currentUrl.endsWith('music')) {
      this.router.navigate(["music/list-songs"]);
    }
  }

  show(): void {
    console.log(this.formData.getRawValue());
  }

  inputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    console.log(inputElement.value);
  }
}
