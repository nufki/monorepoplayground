import { selectCommentById } from './../../+state/post.selectors';
import { CommentEntity } from './../../+state/post.models';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'united-comment-like',
  templateUrl: './comment-like.component.html',
  styleUrls: ['./comment-like.component.css'],
})
export class CommentLikeComponent implements OnInit {
  //post$: Observable<CommentEntity | undefined> = this.store.select(selectCommentById);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}
}
