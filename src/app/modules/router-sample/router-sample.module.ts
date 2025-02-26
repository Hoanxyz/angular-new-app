import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterSampleRoutingModule } from './router-sample-routing.module';
import { IndexComponent } from './components/index/index.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {HeroesModule} from "./heroes/heroes.module";
import { ComposeMessageComponent } from './components/compose-message/compose-message.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    IndexComponent,
    PageNotFoundComponent,
    ComposeMessageComponent
  ],
    imports: [
        CommonModule,
        HeroesModule,
        RouterSampleRoutingModule,
        FormsModule
    ]
})
export class RouterSampleModule { }
