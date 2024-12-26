import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {listApis} from "../../../../shared/services/global-variables.constant";
import {Injectable} from "@angular/core";
import {PageAble} from "../../../../shared/models/models";
import {ApiService} from "../../../../shared/services/services.service";
import {MusicSharedService} from "./music-shared.service";

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  constructor(
    private http: HttpClient,
    public apiService: ApiService,
    private musicSharedService: MusicSharedService
  ) {
  }

  searchSongs(pageAble: PageAble, url: string): Observable<any> {
    return this.http.post<any>(`${listApis.local}/${url}`, pageAble);
  }

  getSongBase64(id: number): Observable<any> {
    return this.http.get<any>(`${listApis.local}/song/get-song-base-64/${id}`,
      { observe: 'response' }
    );
  }

  getSong(id: number): Observable<any> {
    return this.http.get<any>(`${listApis.local}/song/get-song/${id}`,
      { observe: 'response', responseType: 'blob' as 'json' }
    );
  }

  uploadSong(formData: any): Observable<any> {
    return this.http.post<any>(`${listApis.local}/song/create`, formData);
  }

  deleteSong(id: number): Observable<any> {
    return this.http.post<any>(`${listApis.local}/song/delete/${id}`, {});
  }

  addToFav(data: any): Observable<any>  {
    return this.http.post<any>(`${listApis.local}/song/add-fav`, data);
  }

  deleteFav(data: any): Observable<any>  {
    return this.http.post<any>(`${listApis.local}/song/delete-fav`, data);
  }

  /**
   * Get list id of fav songs
   *
   * @param id number
   */

  findFavSongIdsByUserId(id: number): Observable<any> {
    return this.http.get<any>(`${listApis.local}/song/get-fav-ids`,
      { params: {id} }
    );
  }

  findNewestSong(): Observable<any> {
    return this.http.get<any>(`${listApis.local}/song/get-newest-song`);
  }

  findNextSong(id: number): Observable<any> {
    return this.http.get<any>(`${listApis.local}/song/get-next-song/${id}`);
  }

  findPreSong(id: number): Observable<any> {
    return this.http.get<any>(`${listApis.local}/song/get-pre-song/${id}`);
  }

  getPosts(): Observable<any> {
    return this.http.get<any>(`${listApis.local}/test-fiegn/get-posts`);
  }

  createSongCollection(data: any): Observable<any> {
    return this.http.post<any>(`${listApis.local}/song-collection/create`, data);
  }

  handleAddToCollection(data: any): Observable<any> {
    return this.http.post<any>(`${listApis.local}/song-collection/handle-add-to-collection`, data);
  }

  userSongCollection(id: any): Observable<any> {
    return this.http.get<any>(`${listApis.local}/song-collection/list-of-user/${id}`);
  }

  storageCollections(): void {
    this.userSongCollection(this.apiService.getCurrentUser().id).subscribe(
      (res: any) => {
        localStorage.setItem('songCollections', JSON.stringify(res));
        this.musicSharedService.emmitNewCollection();
      },
      (err: any) => {
        localStorage.removeItem('songCollections');
      }
    )
  }

  deleteCollection(id: number): Observable<any> {
    return this.http.post<any>(`${listApis.local}/song-collection/delete/${id}`, {});
  }

  getCollectionsStorage(): any {
    const collectionsData = localStorage.getItem('songCollections');
    return collectionsData ? JSON.parse(collectionsData) : [];
  }
}
