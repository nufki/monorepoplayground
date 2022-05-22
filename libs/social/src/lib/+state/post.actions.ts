import { createAction, props } from '@ngrx/store';
import { PostEntity } from './post.models';

export const init = createAction('[Post Page] Init');

export const loadPostSuccess = createAction(
  '[Post/API] Load Post Success',
  props<{ posts: PostEntity[] }>()
);

export const loadPostFailure = createAction(
  '[Post/API] Load Post Failure',
  props<{ error: any }>()
);

export const loadPostDetailsSuccess = createAction(
  '[Post/API] Load PostDetails Success',
  props<{ post: PostEntity }>()
);

export const loadPostDetailsFailure = createAction(
  '[Post/API] Load PostDetails Failure',
  props<{ error: any }>()
);

export const showPost = createAction(
  '[Router] Show Post',
  props<{ postId: string }>()
);
