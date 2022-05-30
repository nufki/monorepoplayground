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

export const likeUnlikePostSuccess = createAction(
  '[Post/API] Like/Unlike Post Success',
  props<{ post: Post }>()
);

export const likeUnlikePostFailure = createAction(
  '[Post/API] Like/Unlike Post Failure',
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

export const likeUnlikeCommentSuccess = createAction(
  '[Post/API] Like/Unlike Comment Success',
  props<{ postId: string; comment: Comment }>()
);

export const likeUnlikeCommentFailure = createAction(
  '[Post/API] Like/Unlike Comment Failure',
  props<{ error: any }>()
);

export const deleteComment = createAction(
  '[Post/API] Delete Comment',
  props<{ postId: string; commentId: string }>()
);

export const showCommentLikes = createAction(
  '[Router] Show Post Likes',
  props<{ commentId: string }>()
);

export const createComment = createAction(
  '[Router] Create Comment',
  props<{ postId: string; text: string }>()
);

export const createCommentSuccess = createAction(
  '[Post/API] Create Comment Success',
  props<{ postId: string; comment: Comment }>()
);

export const createCommentFailure = createAction(
  '[Post/API] Create Comment Failure',
  props<{ error: any }>()
);

export const deleteCommentSuccess = createAction(
  '[Post/API] Delete Comment Success',
  props<{ postId: string; commentId: string }>()
);

export const deleteCommentFailure = createAction(
  '[Post/API] Delete Comment Failure',
  props<{ error: any }>()
);
