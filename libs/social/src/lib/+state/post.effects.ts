import { selectPostById } from './post.selectors';
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { getSelectors, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { PostService } from '../post.service';
import { PostDetailsComponent } from './../containers/post-details/post-details.component';
import * as PostActions from './post.actions';

@Injectable()
export class PostEffects {
  // INIT
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return this.postService.fetchFriendsPost().pipe(
            map((posts) => {
              console.log('friends post api ', posts);
              this.postService.updateSelfLike(posts);
              return PostActions.loadPostSuccess({ posts });
            })
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return PostActions.loadPostFailure({ error });
        },
      })
    )
  );

  // UPDATE LIKE/UNLIKE POST EFFECT
  updateLikeUnlike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.likeUnlikePost),
      concatLatestFrom(({ postId }) => [
        this.store.select(selectPostById(postId)),
      ]),
      switchMap(([{ postId }, post]) =>
        this.postService.updatePostLikeUnlike(+postId, !post?.selfLike).pipe(
          map((post) =>
            PostActions.updatePostLikeUnlikeSuccess({
              postId: post.id,
            })
          )
        )
      ),
      catchError((error) =>
        of(PostActions.updatePostLikeUnlikeFailure({ error }))
      )
    )
  );

  // DELETE POST EFFECT
  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.deletePost),
      switchMap(({ postId }) =>
        this.postService.deletePost(+postId).pipe(
          map((post) =>
            PostActions.deletePostSuccess({
              postId: post.id,
            })
          )
        )
      ),
      catchError((error) => of(PostActions.deletePostFailure({ error })))
    )
  );

  // LOAD POST DETAILS EFFECT
  loadPostDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.showPost),
      switchMap(({ postId }) =>
        this.postService.fetchPostComments(+postId, 0).pipe(
          map((post) =>
            PostActions.loadPostDetailsSuccess({
              post: post,
            })
          )
        )
      ),
      catchError((error) => of(PostActions.loadPostDetailsFailure({ error })))
    )
  );

  // SHOW POST DETAILS (ROUTING)
  postDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      concatLatestFrom(() => [
        this.store.select(getSelectors().selectCurrentRoute),
        this.store.select(getSelectors().selectRouteParam('id')),
      ]),
      filter(
        ([, route, id]) => route.component === PostDetailsComponent && !!id
      ),
      map(([, , id]) =>
        PostActions.showPost({
          postId: id as string,
        })
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly postService: PostService
  ) {}
}
