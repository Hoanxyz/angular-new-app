import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListSongsComponent} from "./components/list-songs/list-songs.component";
import {MusicComponent} from "./components/music/music.component";
import {LoginMusicComponent} from "./components/login-music/login-music.component";
import {MusicDashboardComponent} from "./components/music-dashboard/music-dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: MusicComponent,
    children: [
      {
        path: 'login',
        component: LoginMusicComponent
      },
      {
        path: 'list-songs',
        component: ListSongsComponent
      },
      {
        path: 'user',
        component: MusicDashboardComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicSiteRoutingModule { }
