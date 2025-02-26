import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicSiteRoutingModule } from './music-site-routing.module';
import { ListSongsComponent } from './components/list-songs/list-songs.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RemoveExtensionPipe} from "../../shared/pipes/remove-extension.pipe";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PlayBarComponent } from './components/play-bar/play-bar.component';
import { SongTableComponent } from './components/song-table/song-table.component';
import { MusicComponent } from './components/music/music.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { HeaderMusicComponent } from './components/header-music/header-music.component';
import {HeaderComponent} from "../../shared/components/header/header.component";
import {MatMenuModule} from "@angular/material/menu";
import {LoginPopupComponent} from "../../shared/components/login-popup/login-popup.component";
import { LoginMusicComponent } from './components/login-music/login-music.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { MusicDashboardComponent } from './components/music-dashboard/music-dashboard.component';
import { MusicUserInfoComponent } from './components/music-dashboard/music-user-info/music-user-info.component';
import { MusicUserUpdateComponent } from './components/music-dashboard/music-user-update/music-user-update.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import {ImageCropperComponent} from "ngx-image-cropper";
import {TabGroupComponent} from "../../shared/components/tab-group/tab-group.component";
import {TabPanelComponent} from "../../shared/components/tab-group/tab-panel/tab-panel.component";
import {SharedModule} from "../../shared/shared.module";
import { MusicUserCollectionsComponent } from './components/music-dashboard/music-user-collections/music-user-collections.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTabsModule} from "@angular/material/tabs";
import { SongCollectionsComponent } from './components/song-collections/song-collections.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';

@NgModule({
  declarations: [
    ListSongsComponent,
    RemoveExtensionPipe,
    SearchBarComponent,
    PlayBarComponent,
    SongTableComponent,
    MusicComponent,
    HeaderMusicComponent,
    HeaderComponent,
    LoginPopupComponent,
    LoginMusicComponent,
    FavoriteListComponent,
    MusicDashboardComponent,
    MusicUserInfoComponent,
    MusicUserUpdateComponent,
    SideBarComponent,
    TabGroupComponent,
    TabPanelComponent,
    MusicUserCollectionsComponent,
    SongCollectionsComponent,
    UploadFileComponent,
  ],
    imports: [
        CommonModule,
        MusicSiteRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatTooltipModule,
        MatMenuModule,
        ImageCropperComponent,
        SharedModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatTabsModule
    ]
})
export class MusicSiteModule { }
