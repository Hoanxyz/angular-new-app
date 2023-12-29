import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../services/post-services.service";
import {IPostDetail} from "../../shared/models/post-service";
import {map, Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post: IPostDetail | undefined;
  post$: Observable<IPostDetail> | undefined;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    // let id = this.route.snapshot.paramMap.get('id');
    // this.postService.GetPostById(id).subscribe(
    //   data => {
    //     this.post = data;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
    //
    // this.post$ = this.route.paramMap.pipe(
    //   map((params) => params.get('id')),
    //   switchMap((id) => this.postService.GetPostById(id))
    // )

    this.post$ = this.route.data.pipe(map((data) => data['post']));
  }
}
