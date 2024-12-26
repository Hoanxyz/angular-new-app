import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TourOfHeroesRoutingModule } from './tour-of-heroes-routing.module';
import { IndexComponent } from './index/index.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import {FormsModule} from "@angular/forms";
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';


@NgModule({
  declarations: [
    IndexComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: [
    CommonModule,
    TourOfHeroesRoutingModule,
    FormsModule
  ]
})
export class TourOfHeroesModule { }
