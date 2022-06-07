import { PostEntity } from './post.models';
import { postsAdapter, PostPartialState, initialState } from './post.reducer';
import * as PostSelectors from './post.selectors';

describe('Post Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPostId = (it: PostEntity) => it.id;
  const createPostEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PostEntity);

  let state: PostPartialState;

  beforeEach(() => {
    state = {
      Post: postsAdapter.setAll(
        [
          createPostEntity('PRODUCT-AAA'),
          createPostEntity('PRODUCT-BBB'),
          createPostEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Post Selectors', () => {
    it('getAllPosts() should return the list of Post', () => {
      const results = PostSelectors.getAllPosts(state);
      const selId = getPostId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = PostSelectors.getSelected(state) as PostEntity;
      const selId = getPostId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getPostsLoaded() should return the current "loaded" status', () => {
      const result = PostSelectors.getPostsLoaded(state);

      expect(result).toBe(true);
    });

    it('getPostsError() should return the current "error" state', () => {
      const result = PostSelectors.getPostsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
