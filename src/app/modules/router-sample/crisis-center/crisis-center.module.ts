import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrisisCenterRoutingModule } from './crisis-center-routing.module';
import { IndexComponent } from './components/index/index.component';
import { CrisisCenterHomeComponent } from './components/crisis-center-home/crisis-center-home.component';
import { CrisisListComponent } from './components/crisis-list/crisis-list.component';
import { CrisisDetailComponent } from './components/crisis-detail/crisis-detail.component';


@NgModule({
  declarations: [
    IndexComponent,
    CrisisCenterHomeComponent,
    CrisisListComponent,
    CrisisDetailComponent
  ],
  imports: [
    CommonModule,
    CrisisCenterRoutingModule
  ]
})
export class CrisisCenterModule { }
