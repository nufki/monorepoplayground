import { createAction, props } from '@ngrx/store';
import { Post } from '../models';
import { Comment } from './../models/comment.interface';

export const init = createAction('[Post Page] Init');

export const loadPostsSuccess = createAction(
  '[Post/API] Load Post Success',
  props<{ posts: Post[] }>()
);

export const loadPostFailure = createAction(
  '[Post/API] Load Post Failure',
  props<{ error: any }>()
);

export const loadPostDetailsSuccess = createAction(
  '[Post/API] Load PostDetails Success',
  props<{ post: Post }>()
);

export const loadPostDetailsFailure = createAction(
  '[Post/API] Load PostDetails Failure',
  props<{ error: any }>()
);

export const showPost = createAction(
  '[Router] Show Post',
  props<{ postId: string }>()
);

export const likeUnlikePost = createAction(
  '[Router] LikeUnlike Post',
  props<{ postId: string }>()
);

export const updatePostLikeUnlikeSuccess = createAction(
  '[Post/API] Update Post Like/Unlike Success',
  props<{ post: Post }>()
);

export const updatePostLikeUnlikeFailure = createAction(
  '[Post/API] Update Post Like/Unlike Failure',
  props<{ error: any }>()
);

export const deletePost = createAction(
  '[Router] delete Post',
  props<{ postId: string }>()
);

export const deletePostSuccess = createAction(
  '[Post/API] Delete Post Success',
  props<{ postId: string }>()
);

export const deletePostFailure = createAction(
  '[Post/API] Delete Post Failure',
  props<{ error: any }>()
);

export const likeUnlikeComment = createAction(
  '[Router] LikeUnlike Comment',
  props<{ postId: string; commentId: string }>()
);

export const updateCommentLikeUnlikeSuccess = createAction(
  '[Post/API] Update Comment Like/Unlike Success',
  props<{ postId: string; comment: Comment }>()
);

export const updateCommentLikeUnlikeFailure = createAction(
  '[Post/API] Update Comment Like/Unlike Failure',
  props<{ error: any }>()
);

// export const showPostLikes = createAction(
//   '[Router] Show Post Likes',
//   props<{ postId: string }>()
// );

// export const showCommentLikes = createAction(
//   '[Router] Show Post Likes',
//   props<{ commentId: string }>()
// );
