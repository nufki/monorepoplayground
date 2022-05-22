import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromBooks from './+state/books.reducer';
import { BooksEffects } from './+state/books.effects';
import { BookListComponent } from './book-list/book-list.component';
import { GoogleBooksService } from './books.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromBooks.BOOKS_FEATURE_KEY, fromBooks.reducer),
    EffectsModule.forFeature([BooksEffects]),
  ],
  exports: [BookListComponent],
  declarations: [BookListComponent],
  providers: [GoogleBooksService],
})
export class BookListModule {}
