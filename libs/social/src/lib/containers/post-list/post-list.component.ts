import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { deletePost, init } from '../../+state/post.actions';
import { LikeEntity, PostEntity } from '../../+state/post.models';
import {
  getAllPosts,
  getPostError,
  selectPostLikes,
} from '../../+state/post.selectors';
import { Post } from '../../models';
import { likeUnlikePost } from './../../+state/post.actions';

@Component({
  selector: 'united-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts$: Observable<PostEntity[]> = this.store.select(getAllPosts);
  postsError$: Observable<any> = this.store.select(getPostError);

  constructor(private store: Store, private router: Router) {}

  getPostLikes(post: PostEntity) {
    return this.store.select(selectPostLikes(post.id as string));
  }

  ngOnInit(): void {
    this.store.dispatch(init());
  }

  onPostDetail(id: string) {
    this.router.navigate(['post-details/' + id]);
  }

  onPostLike(id: string) {
    console.log('post like clicked: ', id);
    this.store.dispatch(likeUnlikePost({ postId: id }));
  }

  onPostDelete(id: string) {
    console.log('post delete clicked: ', id);
    this.store.dispatch(deletePost({ postId: id }));
  }
}
