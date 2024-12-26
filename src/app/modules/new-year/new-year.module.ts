import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { NewYearRoutingModule } from './new-year-routing.module';
import {IntroducePopupComponent} from "../../shared/components/introduce-popup/introduce-popup.component";
import { MainPageComponent } from './main-page/main-page.component';
import { IntroducePageComponent } from './introduce-page/introduce-page.component';
import { FireWorksComponent } from './shared/components/fire-works/fire-works.component';
import { TimelineComponent } from './timeline/timeline.component';
import { EventComponent } from './timeline/event/event.component';
import {LightgalleryModule} from "lightgallery/angular";
import {NewYearComponent} from "./new-year/new-year.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { LuckyMoneyComponent } from './lucky-money/lucky-money.component';
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    NewYearComponent,
    IntroducePopupComponent,
    MainPageComponent,
    IntroducePageComponent,
    FireWorksComponent,
    TimelineComponent,
    EventComponent,
    LuckyMoneyComponent
  ],
  imports: [
    CommonModule,
    NewYearRoutingModule,
    NgOptimizedImage,
    LightgalleryModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  exports: [
  ]
})
export class NewYearModule { }
