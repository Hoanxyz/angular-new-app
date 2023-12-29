import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {IPostDetail} from "../modules/posts/shared/models/post-service";
import {PostService} from "../modules/posts/services/post-services.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PostResolver implements Resolve<IPostDetail> {
  constructor(private articleService: PostService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IPostDetail> | Promise<IPostDetail> | IPostDetail {
    const id = route.paramMap.get('id');
    return this.articleService.GetPostById(id);
  }
}
