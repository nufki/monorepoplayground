import { Action } from '@ngrx/store';

import * as PostActions from './post.actions';
import { PostEntity } from './post.models';
import { State, initialState, reducer } from './post.reducer';

describe('Post Reducer', () => {
  const createPostEntity = (id: string, text = ''): PostEntity => ({
    id,
    text: text || `name-${id}`,
  });

  describe('valid Post actions', () => {
    it('loadPostSuccess should return the list of known Post', () => {
      const Post = [
        createPostEntity('PRODUCT-AAA'),
        createPostEntity('PRODUCT-zzz'),
      ];
      const action = PostActions.loadPostsSuccess({ Post });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
