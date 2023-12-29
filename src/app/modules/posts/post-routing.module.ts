import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListPostsComponent} from './components/list-posts/list-posts.component';
import {PostDetailComponent} from "./components/post-detail/post-detail.component";
import {PostResolver} from "../../services/post-resolver.service";

const routes: Routes = [
  {
    path: 'posts',
    children: [
      {
        path: '',
        component: ListPostsComponent,
      },
      {
        path: ':id',
        component: PostDetailComponent,
        resolve: {
          post: PostResolver,
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
