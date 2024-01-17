import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostModule} from "./modules/posts/post.module";
import {AdminModule} from "./modules/admin/admin.module";
import {BirthdayModule} from "./modules/birthday/birthday.module";

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
