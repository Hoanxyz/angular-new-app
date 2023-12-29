import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./components/admin/admin.component";
import {ListPostsComponent} from "./components/list-posts/list-posts.component";
import {EditPostComponent} from "./components/edit-post/edit-post.component";
import {AdminGuard} from "../../../guard/admin.guard";
import {LeaveEditGuard} from "../../../guard/leave-edit.guard";

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'posts',
        component: ListPostsComponent,
      },
      {
        path: 'posts/:id/edit',
        component: EditPostComponent,
        canActivate: [AdminGuard],
        canDeactivate: [LeaveEditGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
