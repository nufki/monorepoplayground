import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { PostEntity } from './+state/post.models';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  socialNetServiceURL = 'https://social-service.mvp-634705352654.yeekatee.com';

  constructor(private http: HttpClient) {}

  /***************************************************************************
   * Fetch friends "post cards" with user mentions, hashtags, assettags
   ***************************************************************************/
  fetchFriendsPost(): Observable<Array<PostEntity>> {
    const apiEndpoint =
      this.socialNetServiceURL +
      '/api1/social-networking/posts/by-friends/nufki81?limit=10&offset=0';

    console.log(apiEndpoint);
    return this.http.get<{ items: PostEntity[] }>(apiEndpoint).pipe(
      tap((data) => console.log(data)),
      catchError((error) => of(error)),
      map((posts) => posts || [])
    );
  }

  /***************************************************************************
   * Fetch post comments, associated tags (user mentions, assetTags &
   * hashTags etc. from the back-end.
   ***************************************************************************/
  public fetchPostComments(
    postId: number,
    page: number = 0
  ): Observable<PostEntity> {
    const apiEndpoint =
      this.socialNetServiceURL +
      '/api1/social-networking/posts/' +
      postId +
      '/details?username=nufki81&limit=10&offset=' +
      page * 10;

    console.log(apiEndpoint);
    return this.http.get<any>(apiEndpoint).pipe(
      tap((data) => console.log(data)),
      catchError((error) => of(error)),
      map((post) => post || [])
    );
  }
}
