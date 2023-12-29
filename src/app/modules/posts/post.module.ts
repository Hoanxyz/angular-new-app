import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import {ListPostsComponent} from "./components/list-posts/list-posts.component";
import {PostDetailComponent} from "./components/post-detail/post-detail.component";

@NgModule({
  declarations: [
    ListPostsComponent,
    PostDetailComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule
  ]
})
export class PostModule { }
