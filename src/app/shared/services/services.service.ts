import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {User} from "../models/models";
import {users} from '../datas/datas'
import {HttpClient} from "@angular/common/http";
import {listApis} from "./global-variables.constant";
import {SharedService} from "./shared.service";

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) {}

  getUser(userCode: string): Observable<User | undefined> {
    const user = users.find(item => item.code === userCode);
    return of(user);
  }

  createUser(formData: any): Observable<any> {
    return this.http.post<any>(`${listApis.local}/user/register`, formData)
  }

  allUsers(formData: any): Observable<any> {
    return this.http.post<any>(`${listApis.local}/user/all`, formData)
  }

  login(formData: any): Observable<any> {
    return this.http.post<any>(`${listApis.local}/user/login`, formData)
  }

  getCurrentUser(): any {
    const userData = localStorage.getItem("currentUser");
    return userData ? JSON.parse(userData) : null;
  }

  getUserByName(params: any): Observable<any> {
    return this.http.get<any>(`${listApis.local}/user/get-user-by-name`, {params: {...params}})
  }

  updateUser(userData: any, id: any, oldPass: string): Observable<any> {
    return this.http.post<any>(`${listApis.local}/user/update/${id}?password=${oldPass}`, userData)
  }

  setNewDataUser(name: string): void {
    this.getUserByName({name}).subscribe(
      (res) => {
        localStorage.setItem('currentUser', JSON.stringify(res));
        this.sharedService.emmitLogin();
        this.sharedService.emmitReloadUser();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  checkTokenValid(): Observable<any> {
    return this.http.get<any>(`${listApis.local}/user/check-token-valid`);
  }

  isUserExist(username: string): Observable<boolean> {
    return this.http.post<any>(`${listApis.local}/user/is-user-exist`, {username});
  }
}
