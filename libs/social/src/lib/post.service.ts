import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { LikeEntity } from './+state/post.models';
import { Comment } from './models';
import { Post } from './models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  socialNetServiceURL = 'https://social-service.mvp-634705352654.yeekatee.com';
  limit = 5;

  constructor(private http: HttpClient) {}

  /***************************************************************************
   * Fetch friends "post cards" with user mentions, hashtags, assettags
   ***************************************************************************/
  fetchFriendsPost(page: number): Observable<Post[]> {
    const apiEndpoint =
      this.socialNetServiceURL +
      '/api1/social-networking/posts/by-friends/nufki81' +
      '?limit=' +
      this.limit +
      '&offset=' +
      page * this.limit;

    console.log(apiEndpoint);
    return this.http.get<{ items: Post[] }>(apiEndpoint).pipe(
      // tap((data) => console.log(data)),
      catchError((error) => of(error)),
      map((posts) => posts || [])
    );
  }

  /***************************************************************************
   * Fetch assetTag posts, associated comments, user mentions, assetTags,
   * hashTags etc. from the back-end.
   ***************************************************************************/
  public fetchAssetTagPosts(assetTag: string): Observable<Post[]> {
    const apiEndpoint =
      this.socialNetServiceURL +
      '/api1/social-networking/posts/by-assettags/' +
      assetTag +
      '?username=nufki81&limit=10&offset=0';

    console.log(apiEndpoint);
    return this.http.get<any>(apiEndpoint).pipe(
      tap((data) => console.log(data)),
      map((posts) => posts || [])
    );
  }

  /***************************************************************************
   * Fetch post card and comments, associated tags (user mentions, assetTags &
   * hashTags etc. from the back-end.
   ***************************************************************************/
  fetchPostComments(postId: number, page: number = 0): Observable<Post> {
    const apiEndpoint =
      this.socialNetServiceURL +
      '/api1/social-networking/posts/' +
      postId +
      '/details?username=nufki81&limit=10&offset=' +
      page * 10;

    console.log(apiEndpoint);
    return this.http.get<Post>(apiEndpoint).pipe(
      // tap((data) => console.log(data)),
      catchError((error) => of(error)),
      map((post) => post || [])
    );
  }

  /***************************************************************************
   * Like / Unlike a post in the social service
   ***************************************************************************/
  updatePostLikeUnlike(
    postId: number,
    like: boolean,
    isAnonymous: boolean = false
  ): Observable<Post> {
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
   * TODO: Can be moved to a utility
   ***************************************************************************/
  isSelfLike(likes: LikeEntity[] | undefined = []) {
    return likes.find((like: LikeEntity) => like.user.username === 'nufki81');
  }

  /***************************************************************************
   * Delete a post in the social service
   ***************************************************************************/
  deletePost(postId: number) {
    const apiEndpoint =
      this.socialNetServiceURL +
      '/api1/social-networking/posts/' +
      postId +
      '?username=nufki81';

    console.log('deletePost: ' + apiEndpoint);

    return this.http.delete<any>(apiEndpoint);
  }

  /***************************************************************************
   * Like / Unlike a comment in the social service
   ***************************************************************************/
  updateCommentLikeUnlike(
    commentId: number,
    like: boolean
  ): Observable<Comment> {
    let apiEndpoint = '';

    if (like) {
      apiEndpoint =
        this.socialNetServiceURL +
        '/api1/social-networking/likes/comments/' +
        commentId +
        '?username=nufki81' +
        '&mode=LIKE';
    } else {
      apiEndpoint =
        this.socialNetServiceURL +
        '/api1/social-networking/likes/comments/' +
        commentId +
        '?username=nufki81' +
        '&mode=UNLIKE';
    }

    return this.http.patch<any>(apiEndpoint, null);
  }

  /***************************************************************************
   * Create a comment in the social service
   ***************************************************************************/
  createComment(postId: number, text: string): Observable<Comment> {
    const apiEndpoint =
      this.socialNetServiceURL +
      '/api1/social-networking/posts/' +
      postId +
      '/comments?username=nufki81';

    console.log(apiEndpoint);
    return this.http.post<any>(apiEndpoint, { text: text });
  }

  /***************************************************************************
   * Delete a comment in the social service
   ***************************************************************************/
  deleteComment(commentId: number) {
    const apiEndpoint =
      this.socialNetServiceURL +
      '/api1/social-networking/posts/comments/' +
      commentId +
      '?username=nufki81';

    console.log(apiEndpoint);
    return this.http.delete<any>(apiEndpoint);
  }

  /***************************************************************************
   * Edit existing comment
   ***************************************************************************/
  editComment(commentId: number, text: string): Observable<Comment> {
    const apiEndpoint =
      this.socialNetServiceURL +
      '/api1/social-networking/posts/comments/' +
      commentId +
      '/?username=nufki81';

    console.log(apiEndpoint);
    return this.http.patch<any>(apiEndpoint, { text: text }).pipe(
      // tap((data) => console.log(data)),
      map((comment) => {
        return comment;
      })
    );
  }
}
