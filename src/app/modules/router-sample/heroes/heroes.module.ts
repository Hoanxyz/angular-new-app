import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import {FormsModule} from "@angular/forms";
import {HeroesListComponent} from "./heroes-list/heroes-list.component";


@NgModule({
  declarations: [
    HeroDetailComponent,
    HeroesListComponent
  ],
    imports: [
        CommonModule,
        HeroesRoutingModule,
        FormsModule
    ]
})
export class HeroesModule { }
