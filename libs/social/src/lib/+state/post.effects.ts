import { selectCommentById, selectPostById } from './post.selectors';
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { getSelectors, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { PostService } from '../post.service';
import { PostDetailsComponent } from './../containers/post-details/post-details.component';
import * as PostActions from './post.actions';
import { PostLikesComponent } from '../containers/post-likes/post-likes.component';
import { CommentLikeComponent } from '../containers/comment-like/comment-like.component';

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
              return PostActions.loadPostsSuccess({ posts });
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
  updateLikeUnlikePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.likeUnlikePost),
      concatLatestFrom(({ postId }) => [
        this.store.select(selectPostById(postId)),
      ]),
      switchMap(([{ postId }, post]) =>
        this.postService
          .updatePostLikeUnlike(
            +postId,
            !this.postService.isSelfLike(post?.likes)
          )
          .pipe(
            map((post) =>
              PostActions.updatePostLikeUnlikeSuccess({
                post: post,
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

  // LOAD POST DETAILS (COMMENTS FROM BACKEND) EFFECT
  loadPostDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.showPost),
      switchMap(({ postId }) =>
        this.postService.fetchPostComments(+postId, 0).pipe(
          map((post) => {
            return PostActions.loadPostDetailsSuccess({
              post,
            });
          })
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

  // SHOW COMMENT LIKES (ROUTING)
  commentLikeDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      concatLatestFrom(() => [
        this.store.select(getSelectors().selectCurrentRoute),
        this.store.select(getSelectors().selectRouteParam('id')),
      ]),
      filter(
        ([, route, id]) => route.component === CommentLikeComponent && !!id
      ),
      map(([, , id]) =>
        PostActions.showCommentLikes({
          commentId: id as string,
        })
      )
    )
  );

  // SHOW POST LIKES (ROUTING)
  // postLikeDetails$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ROUTER_NAVIGATED),
  //     concatLatestFrom(() => [
  //       this.store.select(getSelectors().selectCurrentRoute),
  //       this.store.select(getSelectors().selectRouteParam('id')),
  //     ]),
  //     filter(([, route, id]) => route.component === PostLikesComponent && !!id),
  //     map(([, , id]) =>
  //       PostActions.showPostLikes({
  //         postId: id as string,
  //       })
  //     )
  //   )
  // );

  // UPDATE LIKE/UNLIKE COMMENT EFFECT
  updateLikeUnlikeComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.likeUnlikeComment),
      concatLatestFrom(({ postId, commentId }) => [
        this.store.select(selectCommentById(postId, commentId)),
      ]),
      switchMap(([{ postId, commentId }, comment]) =>
        this.postService
          .updateCommentLikeUnlike(
            +commentId,
            !this.postService.isSelfLike(comment?.likes)
          )
          .pipe(
            map((c) =>
              PostActions.updateCommentLikeUnlikeSuccess({
                postId: postId,
                comment: c,
              })
            )
          )
      ),
      catchError((error) =>
        of(PostActions.updateCommentLikeUnlikeFailure({ error }))
      )
    )
  );

  // CREATE COMMENT EFFECT
  createComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.createComment),
      switchMap(({ postId, text }) =>
        this.postService.createComment(+postId, text).pipe(
          map((comment) =>
            PostActions.createCommentSuccess({
              postId: postId,
              comment: comment,
            })
          )
        )
      ),
      catchError((error) => of(PostActions.createCommentFailure({ error })))
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly postService: PostService
  ) {}
}
