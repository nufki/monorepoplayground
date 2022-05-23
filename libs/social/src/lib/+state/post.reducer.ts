import { state } from '@angular/animations';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as PostActions from './post.actions';
import { PostEntity } from './post.models';

export const POST_FEATURE_KEY = 'Post';

export interface State extends EntityState<PostEntity> {
  selectedId?: string | number; // which Post record has been selected
  loaded: boolean; // has the Post list been loaded
  error?: string | null; // last known error (if any)
}

export interface PostPartialState {
  readonly [POST_FEATURE_KEY]: State;
}

export const postsAdapter: EntityAdapter<PostEntity> =
  createEntityAdapter<PostEntity>();

export const initialState: State = postsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const PostReducer = createReducer(
  initialState,
  on(PostActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(PostActions.loadPostSuccess, (state, { posts }) =>
    postsAdapter.setAll(posts, { ...state, loaded: true })
  ),
  on(PostActions.loadPostDetailsSuccess, (state: State, { post }) =>
    postsAdapter.upsertOne(post, {
      ...state,
      selectedId: post.id,
      loaded: true,
    })
  ),
  on(PostActions.showPost, (state: State, { postId }) => ({
    ...state,
    selectedId: postId,
    loaded: false,
  })),
  on(PostActions.loadPostFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(PostActions.updatePostLikeUnlikeSuccess, (state: State, { postId }) =>
    //postsAdapter.upsertOne({ ...post, selfLike: !post.selfLike }, state)
    postsAdapter.updateOne(
      {
        id: postId,
        changes: { selfLike: !state.entities[postId]?.selfLike },
      },
      state
    )
  )
);

export function reducer(state: State | undefined, action: Action) {
  return PostReducer(state, action);
}
