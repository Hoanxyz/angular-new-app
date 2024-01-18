import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewYearComponent} from "./new-year/new-year.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {IntroducePageComponent} from "./introduce-page/introduce-page.component";

const routes: Routes = [
  {
    path: '',
    component: NewYearComponent,
    children: [
      {
        path: 'intro',
        component: IntroducePageComponent
      },
      {
        path: 'main',
        component: MainPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewYearRoutingModule { }
