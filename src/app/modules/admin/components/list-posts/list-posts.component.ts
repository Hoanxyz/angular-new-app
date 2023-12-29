import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IPostDetail} from "../../../posts/shared/models/post-service";
import {PostService} from "../../../posts/services/post-services.service";

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {

  dataSource!: [IPostDetail];
  displayedColumns: string[] = ['id', 'title', 'edit'];
  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    console.log(123)
    this.postService.GetListPosts().subscribe(
      data => {
        this.dataSource = data;
        console.log(this.dataSource);
      },
      error => {
        console.log(error);
      }
    )
  }
}
