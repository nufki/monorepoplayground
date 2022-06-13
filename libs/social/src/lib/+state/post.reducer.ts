import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as PostActions from './post.actions';
import { CommentEntity, PostEntity } from './post.models';

export const POSTS_FEATURE_KEY = 'Posts';

export interface State extends EntityState<PostEntity> {
  selectedId?: string | number; // which Post record has been selected
  loaded: boolean; // has the Post list been loaded
  error?: string | null; // last known error (if any)
  filter?: PostFilter;
}

export interface PostFilter {
  type: PostType;
  assetTag?: string;
}

export enum PostType {
  TIMELINE = 'TIMELINE',
  INSTRUMENT = 'INSTRUMENT',
  USERPROFILE = 'USERPROFILE',
}

export interface PostPartialState {
  readonly [POSTS_FEATURE_KEY]: State;
}

export const postsAdapter: EntityAdapter<PostEntity> =
  createEntityAdapter<PostEntity>();

export const commentsAdapter: EntityAdapter<CommentEntity> =
  createEntityAdapter<CommentEntity>();

export const initialState: State = postsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  filter: {
    type: PostType.TIMELINE,
  },
});

export const initialCommentState = commentsAdapter.getInitialState({});

const PostReducer = createReducer(
  initialState,
  // Post initializers triggered by routes
  on(PostActions.loadHomeTimeline, (state) => ({
    ...state,
    loaded: false,
    error: null,
    filter: {
      type: PostType.TIMELINE,
    },
  })),
  on(PostActions.loadInstrumentPosts, (state, { assetTag }) => ({
    ...state,
    loaded: false,
    error: null,
    filter: {
      type: PostType.INSTRUMENT,
      assetTag: assetTag,
    },
  })),
  // Triggered when refreshing posts (reset loaded)
  on(PostActions.loadPosts, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(PostActions.loadPostsSuccess, (state, { posts }) => {
    const postEntities: PostEntity[] = posts.map((post) => ({
      ...post,
      comments: initialCommentState,
    }));
    return postsAdapter.setAll(postEntities, { ...state, loaded: true });
  }),
  on(PostActions.loadPostsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  // Load more (reset loaded)
  on(PostActions.loadMorePosts, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(PostActions.loadMorePostsSuccess, (state, { posts }) => {
    const postEntities: PostEntity[] = posts.map((post) => ({
      ...post,
      comments: initialCommentState,
    }));
    return postsAdapter.addMany(postEntities, { ...state, loaded: true });
  }),
  on(PostActions.loadMorePostsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
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
  on(PostActions.likeUnlikePostSuccess, (state: State, { post }) =>
    postsAdapter.updateOne(
      {
        id: post.id,
        changes: { likes: post.likes },
      },
      state
    )
  ),
  on(PostActions.likeUnlikePostFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(PostActions.deletePostSuccess, (state: State, { postId }) =>
    postsAdapter.removeOne(postId, state)
  ),
  on(PostActions.deletePostFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    PostActions.likeUnlikeCommentSuccess,
    (state: State, { postId, comment }) => {
      return postsAdapter.updateOne(
        {
          id: postId,
          changes: {
            comments: commentsAdapter.updateOne(
              {
                id: comment.id,
                changes: { likes: comment.likes },
              },
              state.entities[postId]?.comments ?? initialCommentState
            ),
          },
        },
        state
      );
    }
  ),
  on(PostActions.likeUnlikeCommentFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(PostActions.createCommentSuccess, (state: State, { postId, comment }) => {
    const cmtCnt = state.entities[postId]?.commentCnt;
    return postsAdapter.updateOne(
      {
        id: postId,
        changes: {
          comments: commentsAdapter.addOne(
            comment,
            state.entities[postId]?.comments ?? initialCommentState
          ),
          commentCnt: cmtCnt ? cmtCnt + 1 : 1,
        },
      },
      state
    );
  }),
  on(PostActions.createCommentFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    PostActions.deleteCommentSuccess,
    (state: State, { postId, commentId }) => {
      const cmtCnt = state.entities[postId]?.commentCnt;
      return postsAdapter.updateOne(
        {
          id: postId,
          changes: {
            comments: commentsAdapter.removeOne(
              commentId,
              state.entities[postId]?.comments ?? initialCommentState
            ),
            commentCnt: cmtCnt ? cmtCnt - 1 : 1,
          },
        },
        state
      );
    }
  ),
  on(PostActions.deleteCommentFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(PostActions.editCommentSuccess, (state: State, { postId, comment }) => {
    return postsAdapter.updateOne(
      {
        id: postId,
        changes: {
          comments: commentsAdapter.updateOne(
            {
              id: comment.id,
              changes: { text: comment.text },
            },
            state.entities[postId]?.comments ?? initialCommentState
          ),
        },
      },
      state
    );
  }),
  on(PostActions.editCommentFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return PostReducer(state, action);
}
