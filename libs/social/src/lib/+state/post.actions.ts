import { createAction, props } from '@ngrx/store';
import { Post } from '../models';
import { Comment } from './../models/comment.interface';

// export const init = createAction('[Post Page] Init');

//export const initHomeTimeline = createAction('[Post Page] Init Home Timeline');

export const loadHomeTimeline = createAction('[Post Page] Init Home Timeline');
export const loadInstrumentPosts = createAction(
  '[Post Page] Init Instrument Posts',
  props<{ assetTag: string }>()
);

export const loadMorePosts = createAction(
  '[Post/API] Load more posts',
  props<{ page: number }>()
);

export const loadPosts = createAction('[Post/API] Load posts');

// export const loadMoreTimelinePosts = createAction(
//   '[Post/API] Load more timeline posts',
//   props<{ page: number }>()
// );

export const initAssetTagFeed = createAction(
  '[Post/API] Init AssetTag Feed',
  props<{ assetTag: string }>()
);

export const loadPostsSuccess = createAction(
  '[Post/API] Load Post Success',
  props<{ posts: Post[] }>()
);

export const loadPostsFailure = createAction(
  '[Post/API] Load Post Failure',
  props<{ error: any }>()
);

export const loadMorePostsSuccess = createAction(
  '[Post/API] Load More Post Success',
  props<{ posts: Post[] }>()
);

export const loadMorePostsFailure = createAction(
  '[Post/API] Load More Post Failure',
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
  '[Post/API] Update Post Like/Unlike Success',
  props<{ post: Post }>()
);

export const likeUnlikePostFailure = createAction(
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

export const likeUnlikeCommentSuccess = createAction(
  '[Post/API] Update Comment Like/Unlike Success',
  props<{ postId: string; comment: Comment }>()
);

export const likeUnlikeCommentFailure = createAction(
  '[Post/API] Update Comment Like/Unlike Failure',
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

export const editComment = createAction(
  '[Post/API] Edit Comment',
  props<{ postId: string; commentId: string; text: string }>()
);

export const editCommentSuccess = createAction(
  '[Post/API] Edit Comment Success',
  props<{ postId: string; comment: Comment }>()
);

export const editCommentFailure = createAction(
  '[Post/API] Edit Comment Failure',
  props<{ error: any }>()
);
