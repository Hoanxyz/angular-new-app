import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeroesListComponent} from "./components/heroes-list/heroes-list.component";
import {CrisisListComponent} from "./components/crisis-list/crisis-list.component";
import {IndexComponent} from "./components/index/index.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {path: 'crisis-list', component: CrisisListComponent},
      {path: 'heroes-list', component: HeroesListComponent},
      {path: '', redirectTo: '/heroes-list', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouterSampleRoutingModule { }
