import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostModule} from "./modules/posts/post.module";
import {AdminModule} from "./modules/admin/admin.module";
import {AdminGuard} from "../guard/admin.guard";

const routes: Routes = [
  {
    path: 'posts',
    loadChildren: () => import('./modules/posts/post.module').then((m) => PostModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then((m) => AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
