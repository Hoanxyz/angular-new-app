import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {EditPostComponent} from "../app/modules/admin/components/edit-post/edit-post.component";
import {CheckDeactivate} from "./interface";

@Injectable({
  providedIn: 'root'
})
export class LeaveEditGuard implements CanDeactivate<CheckDeactivate> {
  canDeactivate(component: CheckDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.checkDeactivate(currentRoute, currentState, nextState); // replace with actual logic
  }
}
