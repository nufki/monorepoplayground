import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { filter, Observable, switchMap } from 'rxjs';
import {
  deleteComment,
  likeUnlikeComment,
  likeUnlikePost,
} from '../../+state/post.actions';
import { PostEntity } from '../../+state/post.models';
import {
  getPostError,
  selectComments,
  selectPost,
} from '../../+state/post.selectors';

@Component({
  selector: 'united-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  post$: Observable<PostEntity | undefined> = this.store.select(selectPost);
  comments$ = this.post$.pipe(
    filter((post) => !!post),
    switchMap((post) => this.store.select(selectComments(post?.id as string)))
  );
  postError$: Observable<any> = this.store.select(getPostError);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    console.log('PostDetailsComponent - ngOnInit');
    this.post$.subscribe((p) => {
      console.log('post: ', p);
    });
  }

  onPostDetail(id: string) {
    //this.router.navigate(['post-details/' + id]);
  }

  onPostLike(id: string) {
    console.log('post like clicked: ', id);
    this.store.dispatch(likeUnlikePost({ postId: id }));
  }

  onCommentLike(postId: string, commentId: string) {
    console.log('comment like clicked: ', commentId);
    this.store.dispatch(
      likeUnlikeComment({ postId: postId, commentId: commentId })
    );
  }

  onCommentDelete(postId: string, commentId: string) {
    console.log('comment delete clicked: ', commentId);
    this.store.dispatch(
      deleteComment({ postId: postId, commentId: commentId })
    );
  }
}
