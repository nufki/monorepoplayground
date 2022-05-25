import { selectCommentById } from './../../+state/post.selectors';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommentEntity } from '../../+state/post.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'united-comment-like',
  templateUrl: './comment-like.component.html',
  styleUrls: ['./comment-like.component.css'],
})
export class CommentLikeComponent implements OnInit {
  comment$: Observable<CommentEntity | undefined> = this.store.select(
    selectCommentById('513', '789')
  );

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    console.log('CommentLikeComponent - ngOnInit');
    this.comment$.subscribe((c) => {
      console.log('comment: ', c);
    });
  }
}
