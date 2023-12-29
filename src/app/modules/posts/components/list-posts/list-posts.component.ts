import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PostService} from "../../services/post-services.service";
import {IPostDetail} from "../../shared/models/post-service";

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {

  @Output() evtShowDetail = new EventEmitter();

  listOfPosts: [IPostDetail] | undefined
  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.postService.GetListPosts().subscribe(
      data => {
        this.listOfPosts = data;
      },
    error => {
        console.log(error);
      }
    )
  }

  showDetail(post: IPostDetail) {
    this.evtShowDetail.emit(post);
  }
}
