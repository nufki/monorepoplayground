import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as PostActions from './post.actions';
import { PostEntity, CommentEntity } from './post.models';

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
    postsAdapter.updateOne(
      {
        id: postId,
        changes: { selfLike: !state.entities[postId]?.selfLike },
      },
      state
    )
  ),
  on(PostActions.deletePost, (state: State, { postId }) =>
    postsAdapter.removeOne(postId, state)
  ),
  on(
    PostActions.updateCommentLikeUnlikeSuccess,
    (state: State, { postId, commentId }) => {
      //!state.entities[postId]?.comments.find((c) => c.id === commentId)?.selfLike,
      // const cm = state.entities[postId]?.comments.find(
      //   (c) => c.id === commentId
      // );
      // if (cm) cm.selfLike = !cm?.selfLike;

      const cmts = Object.assign(
        <CommentEntity>{},
        state.entities[postId]?.comments
      );
      console.log(cmts[0]);
      console.log(cmts[1]);
      console.log(cmts.length);

      for (let index = 0; index < Object.keys(cmts).length; index++) {
        const c = Object.keys(index) as CommentEntity;
        if (c.id === commentId) {
          c.selfLike = !c.selfLike;
          break;
        }
      }

      const st = postsAdapter.updateOne(
        {
          id: postId,
          changes: {
            comments: cmts,
          },
        },
        state
      );
      return st;
    }
  )
);

//comments[commentId].selfLike: !state.entities[postId]?.comments.find((c) => c.id === commentId)?.selfLike,

export function reducer(state: State | undefined, action: Action) {
  return PostReducer(state, action);
}
