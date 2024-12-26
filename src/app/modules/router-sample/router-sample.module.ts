import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterSampleRoutingModule } from './router-sample-routing.module';
import { CrisisListComponent } from './components/crisis-list/crisis-list.component';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { IndexComponent } from './components/index/index.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    CrisisListComponent,
    HeroesListComponent,
    IndexComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterSampleRoutingModule
  ]
})
export class RouterSampleModule { }
