import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { GoogleBooksService } from './../books.service';
import * as BooksActions from './books.actions';

@Injectable()
export class BooksEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.init),
      switchMap(() => {
        return this.booksService
          .getBooks()
          .pipe(map((books) => BooksActions.loadBooksSuccess({ books })));
      }),
      catchError((error) => of(BooksActions.loadBooksFailure({ error })))
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly booksService: GoogleBooksService
  ) {}
}
