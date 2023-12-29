import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    AdminComponent,
    ListPostsComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ]
})
export class AdminModule { }
