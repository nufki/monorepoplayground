import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { createComment } from '../../+state/post.actions';
import { PostEntity } from '../../+state/post.models';
import { selectPost } from '../../+state/post.selectors';

@Component({
  selector: 'united-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent {
  post$: Observable<PostEntity | undefined> = this.store.select(selectPost);
  commentText = '';

  constructor(private readonly store: Store) {}

  onCreateComment(post: PostEntity) {
    this.store.dispatch(
      createComment({ postId: post.id, text: this.commentText })
    );
    this.commentText = '';
  }
}