import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { init } from '../+state/books.actions';
import { BooksEntity } from '../+state/books.models';
import { getAllBooks, getBooksError } from '../+state/books.selectors';

@Component({
  selector: 'united-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books$: Observable<BooksEntity[]>;
  booksError$: Observable<any>;

  constructor(private store: Store) {
    this.books$ = store.select(getAllBooks);

    this.booksError$ = store.select(getBooksError);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.store.dispatch(init());
  }
}
