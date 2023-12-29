import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {map, Observable} from 'rxjs';
import {UserServices} from "../app/services/user-services.service";
import {PostService} from "../app/modules/posts/services/post-services.service";

@Injectable({
  providedIn: 'root', // you can change to any level if needed
})
export class AdminGuard implements CanActivate {

  constructor(
    private userServices: UserServices,
    private postServices: PostService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.postServices.GetPostById(next.paramMap.get('id')).pipe(
      map(
        (post) => post.userId == this.userServices.currentUser.userId
      )
    ); // replace with actual logic
  }
}
