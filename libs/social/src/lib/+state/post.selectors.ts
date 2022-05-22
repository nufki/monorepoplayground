import { getSelectors } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { POST_FEATURE_KEY, State, postsAdapter } from './post.reducer';

// Lookup the 'Post' feature state managed by NgRx
export const getPostState = createFeatureSelector<State>(POST_FEATURE_KEY);

const { selectRouteParams } = getSelectors();

const { selectAll, selectEntities } = postsAdapter.getSelectors();

export const getPostLoaded = createSelector(
  getPostState,
  (state: State) => state.loaded
);

export const getPostError = createSelector(
  getPostState,
  (state: State) => state.error
);

export const getAllPosts = createSelector(getPostState, (state: State) =>
  selectAll(state)
);

export const getPostEntities = createSelector(getPostState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getPostState,
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
