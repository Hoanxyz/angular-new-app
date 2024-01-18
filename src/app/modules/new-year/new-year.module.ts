import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewYearRoutingModule } from './new-year-routing.module';
import { NewYearComponent } from './new-year/new-year.component';
import {IntroducePopupComponent} from "../../shared/components/introduce-popup/introduce-popup.component";
import { MainPageComponent } from './main-page/main-page.component';
import { IntroducePageComponent } from './introduce-page/introduce-page.component';
import { FireWorksComponent } from './shared/components/fire-works/fire-works.component';


@NgModule({
  declarations: [
    NewYearComponent,
    IntroducePopupComponent,
    MainPageComponent,
    IntroducePageComponent,
    FireWorksComponent
  ],
  imports: [
    CommonModule,
    NewYearRoutingModule
  ],
  exports: [
  ]
})
export class NewYearModule { }
