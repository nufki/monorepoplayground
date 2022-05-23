import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { likeUnlikePost } from '../../+state/post.actions';
import { PostEntity } from '../../+state/post.models';
import { selectPost } from '../../+state/post.selectors';

@Component({
  selector: 'united-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  post$: Observable<PostEntity | undefined> = this.store.select(selectPost);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    console.log('post');
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
}
