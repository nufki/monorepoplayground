import { getSelectors } from '@ngrx/router-store';
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { CommentEntity, PostEntity } from './post.models';
import {
  commentsAdapter,
  postsAdapter,
  POSTS_FEATURE_KEY,
  State,
} from './post.reducer';

// Lookup the 'Post' feature state managed by NgRx
export const getPostsState = createFeatureSelector<State>(POSTS_FEATURE_KEY);

const { selectRouteParams } = getSelectors();

const { selectAll, selectEntities } = postsAdapter.getSelectors();

export const getPostsLoaded = createSelector(
  getPostsState,
  (state: State) => state.loaded
);

export const getPostsError = createSelector(
  getPostsState,
  (state: State) => state.error
);

export const getAllPosts = createSelector(getPostsState, (state: State) =>
  selectAll(state)
);

export const getPostEntities = createSelector(getPostsState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getPostsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getPostEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const selectPost = createSelector(
  getPostEntities,
  selectRouteParams,
  (posts, { id }) => posts[id]
);

export const selectedComment = createSelector(
  getSelected,
  selectRouteParams,
  (post, { id }) =>
    post && post.comments ? post.comments.entities[id] : undefined
);

export const selectPostById = (
  id: string | number
): MemoizedSelector<object, PostEntity | undefined> =>
  createSelector(getPostEntities, (entities) =>
    id ? entities[id] : undefined
  );

export const selectComments = (
  postId: string
): MemoizedSelector<object, CommentEntity[] | undefined> =>
  createSelector(selectPostById(postId), (post) =>
    post && post.comments
      ? commentsAdapter.getSelectors().selectAll(post.comments)
      : undefined
  );

export const selectCommentById = (
  postId: string | number,
  commentId: string
): MemoizedSelector<object, CommentEntity | undefined> =>
  createSelector(selectPostById(postId), (post) =>
    post && post.comments ? post.comments.entities[commentId] : undefined
  );

export const getFilter = createSelector(
  getPostsState,
  (state: State) => state.filter
);
