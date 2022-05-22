import { State } from './counter.selectors';
import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

export const FEATURE_KEY = 'counter';

export const initialState = {
  count: 0,
};

export const counterReducer = createReducer(
  initialState,
  on(increment, (state: State) => ({ ...state, count: state.count + 1 })),
  on(decrement, (state: State) => ({ ...state, count: state.count - 1 })),
  on(reset, () => initialState)
);
