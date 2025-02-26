import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./components/index/index.component";
import {CrisisListComponent} from "./components/crisis-list/crisis-list.component";
import {CrisisDetailComponent} from "./components/crisis-detail/crisis-detail.component";
import {CrisisCenterHomeComponent} from "./components/crisis-center-home/crisis-center-home.component";

const routes: Routes = [
  {
    path: 'crisis-center',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrisisCenterRoutingModule { }
