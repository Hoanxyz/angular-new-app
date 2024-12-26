import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewYearModule} from "./modules/new-year/new-year.module";
import {MusicSiteModule} from "./modules/music-site/music-site.module";
import {TestModule} from "./modules/test/test.module";
import {TourOfHeroesModule} from "./modules/tour-of-heroes/tour-of-heroes.module";

const routes: Routes = [
  {
    path: 'new-year',
    loadChildren: () => import('./modules/new-year/new-year.module').then((m) => NewYearModule)
  },
  {
    path: 'music',
    loadChildren: () => import('./modules/music-site/music-site.module').then((m) => MusicSiteModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./modules/test/test.module').then((m) => TestModule)
  },
  {
    path: 'tour-of-heroes',
    loadChildren: () => import('./modules/tour-of-heroes/tour-of-heroes.module').then((m) => TourOfHeroesModule)
  },
  {
    path: '',
    redirectTo: 'music',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
