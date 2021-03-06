import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, switchMap } from 'rxjs';
import {
  deleteComment,
  likeUnlikeComment,
  likeUnlikePost,
} from '../../+state/post.actions';
import { PostEntity } from '../../+state/post.models';
import {
  getPostsError,
  getPostsLoaded,
  selectComments,
  selectPost,
} from '../../+state/post.selectors';
import { CommentEntity } from './../../+state/post.models';

@Component({
  selector: 'united-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  postsLoaded$: Observable<boolean | undefined> =
    this.store.select(getPostsLoaded);

  post$: Observable<PostEntity | undefined> = this.store.select(selectPost);
  comments$ = this.post$.pipe(
    filter((post) => !!post),
    switchMap((post) => this.store.select(selectComments(post?.id as string)))
  );
  postError$: Observable<any> = this.store.select(getPostsError);
  editingComment: CommentEntity | undefined;
  showKeyboard = false;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    console.log('PostDetailsComponent - ngOnInit');
    this.post$.subscribe((p) => {
      console.log('post: ', p);
    });
  }

  onPostLike(id: string) {
    console.log('PostDetailsComponent - post like clicked: ', id);
    this.store.dispatch(likeUnlikePost({ postId: id }));
  }

  onCommentLike(postId: string, commentId: string) {
    console.log('PostDetailsComponent - comment like clicked: ', commentId);
    this.store.dispatch(
      likeUnlikeComment({ postId: postId, commentId: commentId })
    );
  }

  onCommentDelete(postId: string, commentId: string) {
    console.log('PostDetailsComponent - comment delete clicked: ', commentId);
    this.store.dispatch(
      deleteComment({ postId: postId, commentId: commentId })
    );
  }

  onCommentEdit(comment: CommentEntity) {
    console.log('PostDetailsComponent - comment edit clicked: ', comment);
    this.editingComment = comment;
    this.showKeyboard = true;
  }

  onCommentCancelEdit(commentId: string) {
    console.log(
      'PostDetailsComponent - comment edit cancel clicked: ',
      commentId
    );
    this.editingComment = undefined;
  }

  inputFocus(event: boolean) {
    console.log('PostDetailsComponent', event);
    this.showKeyboard = event;
  }
}
