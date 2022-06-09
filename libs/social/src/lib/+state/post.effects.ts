import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { getSelectors, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { CommentLikeComponent } from '../containers/comment-like/comment-like.component';
import { PostService } from '../post.service';
import { PostDetailsComponent } from './../containers/post-details/post-details.component';
import * as PostActions from './post.actions';
import { PostType } from './post.reducer';
import { getFilter, selectCommentById, selectPostById } from './post.selectors';

@Injectable()
export class PostEffects {
  // HOME TIMELINE INIT
  /*
  initHomeTimeline$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.initHomeTimeline),
      fetch({
        run: (action) => {
          return this.postService.fetchFriendsPost().pipe(
            map((posts) => {
              //console.log('friends post api ', posts);
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
  */

  loadHomeTimelinePosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadHomeTimeline),
      switchMap(() =>
        this.postService.fetchFriendsPost(0).pipe(
          map((posts) => {
            return PostActions.loadPostsSuccess({ posts });
          })
        )
      ),
      catchError((error) => of(PostActions.loadPostsFailure({ error })))
    )
  );

  loadInstrumentPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadInstrumentPosts),
      concatLatestFrom(() => this.store.select(getFilter)),
      switchMap(([, filter]) => {
        if (filter?.assetTag) {
          return this.postService.fetchInstrumentPosts(filter.assetTag, 0).pipe(
            map((posts) => {
              return PostActions.loadPostsSuccess({ posts });
            })
          );
        }
        return of(
          PostActions.loadMorePostsFailure({ error: 'Invalid filter' })
        );
      }),
      catchError((error) => of(PostActions.loadPostsFailure({ error })))
    )
  );

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPosts),
      concatLatestFrom(() => this.store.select(getFilter)),
      switchMap(([, filter]) => {
        switch (filter?.type) {
          case PostType.TIMELINE:
            return this.postService.fetchFriendsPost(0).pipe(
              map((posts) => {
                return PostActions.loadMorePostsSuccess({ posts });
              })
            );
          case PostType.INSTRUMENT:
            if (filter.assetTag) {
              return this.postService
                .fetchInstrumentPosts(filter.assetTag, 0)
                .pipe(
                  map((posts) => {
                    //console.log('friends post api ', posts);
                    return PostActions.loadMorePostsSuccess({ posts });
                  })
                );
            }
            return of(
              PostActions.loadMorePostsFailure({ error: 'Invalid filter' })
            );
          default:
            return of(
              PostActions.loadMorePostsFailure({ error: 'Invalid filter' })
            );
        }
      }),
      catchError((error) => of(PostActions.loadMorePostsFailure({ error })))
    )
  );

  loadMorePosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadMorePosts),
      concatLatestFrom(() => this.store.select(getFilter)),
      switchMap(([{ page }, filter]) => {
        switch (filter?.type) {
          case PostType.TIMELINE:
            return this.postService.fetchFriendsPost(page).pipe(
              map((posts) => {
                return PostActions.loadMorePostsSuccess({ posts });
              })
            );
          case PostType.INSTRUMENT:
            if (filter.assetTag) {
              return this.postService
                .fetchInstrumentPosts(filter.assetTag, page)
                .pipe(
                  map((posts) => {
                    //console.log('friends post api ', posts);
                    return PostActions.loadMorePostsSuccess({ posts });
                  })
                );
            }
            return of(
              PostActions.loadMorePostsFailure({ error: 'Invalid filter' })
            );
          default:
            return of(
              PostActions.loadMorePostsFailure({ error: 'Invalid filter' })
            );
        }
      }),
      catchError((error) => of(PostActions.loadMorePostsFailure({ error })))
    )
  );

  // LIKE/UNLIKE POST EFFECT
  likeUnlikePost$ = createEffect(() =>
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
              PostActions.likeUnlikePostSuccess({
                post: post,
              })
            )
          )
      ),
      catchError((error) => of(PostActions.likeUnlikePostFailure({ error })))
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

  // TRIGGER HOME TIMELINE LOADING WHEN ROUTE INVOLVES THE TIMELINE COMPONENT
  homeTimelinePostsRouted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      concatLatestFrom(() => [
        this.store.select(getSelectors().selectCurrentRoute),
      ]),
      filter(([, route]) => route.component.name === 'TimelineComponent'),
      map(() => PostActions.loadHomeTimeline())
    )
  );

  // TRIGGER HOME TIMELINE LOADING WHEN ROUTE INVOLVES THE INSTRUMENT COMPONENT
  instrumentPostsRouted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      concatLatestFrom(() => [
        this.store.select(getSelectors().selectCurrentRoute),
        this.store.select(getSelectors().selectRouteParam('id')),
      ]),
      filter(([, route]) => route.component.name === 'InstrumentViewComponent'),
      map(([, , id]) => {
        console.log('assettag: ', id);
        return PostActions.loadInstrumentPosts({
          assetTag: id as string,
        });
      })
    )
  );

  // TRIGGER SHOW POST DETAILS FROM ROUTE
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

  // LIKE/UNLIKE COMMENT EFFECT
  likeUnlikeComment$ = createEffect(() =>
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
              PostActions.likeUnlikeCommentSuccess({
                postId: postId,
                comment: c,
              })
            )
          )
      ),
      catchError((error) => of(PostActions.likeUnlikeCommentFailure({ error })))
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

  // DELETE COMMENT EFFECT
  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.deleteComment),
      switchMap(({ postId, commentId }) =>
        this.postService.deleteComment(+commentId).pipe(
          map(() =>
            PostActions.deleteCommentSuccess({
              postId: postId,
              commentId,
            })
          )
        )
      ),
      catchError((error) => of(PostActions.deleteCommentFailure({ error })))
    )
  );

  // EDIT COMMENT EFFECT
  editComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.editComment),
      switchMap(({ postId, commentId, text }) =>
        this.postService.editComment(+commentId, text).pipe(
          map((comment) =>
            PostActions.editCommentSuccess({
              postId: postId,
              comment,
            })
          )
        )
      ),
      catchError((error) => of(PostActions.editCommentFailure({ error })))
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly postService: PostService
  ) {}
}
