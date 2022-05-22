import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FEATURE_KEY } from './counter.reducer';

export interface State {
  count: number;
}

// Lookup the 'Instruments' feature state managed by NgRx
export const featureSelector = createFeatureSelector<State>(FEATURE_KEY);

export const selectFeatureCount = createSelector(
  featureSelector,
  (state: State) => state.count
);
