import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as CounterActions from './counter.actions';

@Injectable()
export class CounterEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterActions.reset),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          //return CounterActions.loadCounterSuccess({ counter: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          //return CounterActions.loadCounterFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
