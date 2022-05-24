import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as PostActions from './post.actions';
import { PostEntity, CommentEntity } from './post.models';
import { getSelectedId, selectPost, selectPostById } from './post.selectors';

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

export const commentsAdapter: EntityAdapter<CommentEntity> =
  createEntityAdapter<CommentEntity>();

export const initialState: State = postsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

export const initialCommentState = commentsAdapter.getInitialState({});

const PostReducer = createReducer(
  initialState,
  on(PostActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(PostActions.loadPostsSuccess, (state, { posts }) => {
    const postEntities: PostEntity[] = posts.map((post) => ({
      ...post,
      comments: initialCommentState,
    }));
    return postsAdapter.setAll(postEntities, { ...state, loaded: true });
  }),
  on(PostActions.loadPostDetailsSuccess, (state: State, { post }) => {
    const comments = state?.entities[post.id]?.comments ?? initialCommentState;
    return postsAdapter.upsertOne(
      {
        ...post,
        comments:
          post.comments.length > 0
            ? commentsAdapter.upsertMany(post.comments, comments)
            : comments,
      },
      {
        ...state,
        selectedId: post.id,
        loaded: true,
      }
    );
  }),
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
      const post = { ...state.entities[postId] };
      if (!post.comments) return state;

      const comment = post.comments.entities[commentId];
      if (!comment) return state;

      const comments = commentsAdapter.updateOne(
        {
          id: commentId,
          changes: {
            selfLike: comment.selfLike,
          },
        },
        post.comments
      );

      const st = postsAdapter.updateOne(
        {
          id: postId,
          changes: {
            comments,
          },
        },
        state
      );
      return state;
    }
  )
);

//comments[commentId].selfLike: !state.entities[postId]?.comments.find((c) => c.id === commentId)?.selfLike,

export function reducer(state: State | undefined, action: Action) {
  return PostReducer(state, action);
}
