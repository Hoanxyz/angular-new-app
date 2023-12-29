import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {IPostDetail} from '../shared/models/post-service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  constructor(
    private http: HttpClient
  ) {
  }

  GetListPosts(): Observable<[IPostDetail]> {
    return this.http.get<[IPostDetail]>(`${environment.apiUrl}/posts`);
  }

  GetPostById(id: string | null): Observable<IPostDetail> {
    return this.http.get<IPostDetail>(`${environment.apiUrl}/posts/${id}`);
  }
}
