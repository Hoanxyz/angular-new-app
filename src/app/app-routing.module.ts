import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostModule} from "./modules/posts/post.module";
import {AdminModule} from "./modules/admin/admin.module";
import {BirthdayModule} from "./modules/birthday/birthday.module";
import {NewYearModule} from "./modules/new-year/new-year.module";

const routes: Routes = [
  {
    path: 'posts',
    loadChildren: () => import('./modules/posts/post.module').then((m) => PostModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then((m) => AdminModule)
  },
  {
    path: 'birthday',
    loadChildren: () => import('./modules/birthday/birthday.module').then((m) => BirthdayModule)
  },
  {
    path: 'new-year',
    loadChildren: () => import('./modules/new-year/new-year.module').then((m) => NewYearModule)
  },
  {
    path: '',
    redirectTo: 'new-year/intro',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
