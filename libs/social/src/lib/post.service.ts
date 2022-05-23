import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { LikeEntity, PostEntity } from './+state/post.models';

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

  /***************************************************************************
   * Send a like of an existing post to the back-end
   ***************************************************************************/
  public updatePostLikeUnlike(
    postId: number,
    like: boolean,
    isAnonymous: boolean = false
  ): Observable<PostEntity> {
    let apiEndpoint = '';

    if (like) {
      apiEndpoint =
        this.socialNetServiceURL +
        '/api1/social-networking/likes/posts/' +
        postId +
        '?username=nufki81&mode=LIKE&isAnonymous=' +
        isAnonymous;
    } else {
      apiEndpoint =
        this.socialNetServiceURL +
        '/api1/social-networking/likes/posts/' +
        postId +
        '?username=nufki81&mode=UNLIKE&isAnonymous=' +
        isAnonymous;
    }

    console.log('sendPostLike: ' + apiEndpoint);
    return this.http.patch<any>(apiEndpoint, null);
  }

  /***************************************************************************
   * Update model if the user has liked any post from a list of posts
   ***************************************************************************/
  public updateSelfLike(posts: PostEntity[]) {
    if (posts) {
      posts.map((post) => {
        const p = post.likes.find((like: LikeEntity) => {
          if (like.user.username === 'nufki81') return true;
          else return false;
        });
        if (p) {
          post.selfLike = true;
        } else {
          post.selfLike = false;
        }
      });
    }
    return false;
  }
}
