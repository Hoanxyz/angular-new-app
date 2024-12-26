import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private toggleSearchSource = new Subject<void>();
  toggleSearch$ = this.toggleSearchSource.asObservable();

  private reloadUserSource = new Subject<void>();
  reloadUser$ = this.reloadUserSource.asObservable();

  private logoutSource = new Subject<void>();
  logout$ = this.logoutSource.asObservable();

  private loginSource = new Subject<void>();
  login$ = this.loginSource.asObservable();

  constructor() { }

  emmitToggleSearch() {
    this.toggleSearchSource.next();
  }

  emmitReloadUser() {
    this.reloadUserSource.next();
  }

  emmitLogout() {
    this.logoutSource.next();
  }

  emmitLogin() {
    this.loginSource.next();
  }
}
