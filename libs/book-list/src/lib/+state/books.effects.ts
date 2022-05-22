import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs';
import { GoogleBooksService } from './../books.service';
import * as BooksActions from './books.actions';

@Injectable()
export class BooksEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return this.booksService.getBooks().pipe(
            map((books) => {
              console.log('book api ', books);
              return BooksActions.loadBooksSuccess({ books });
            })
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return BooksActions.loadBooksFailure({ error });
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly booksService: GoogleBooksService
  ) {}
}
