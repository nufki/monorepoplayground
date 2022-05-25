import { selectComments, selectPost } from './../+state/post.selectors';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostEntity } from '../+state/post.models';
import { filter, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'united-likes-view',
  templateUrl: './likes-view.component.html',
  styleUrls: ['./likes-view.component.css'],
})
export class LikesViewComponent implements OnInit {
  // post$: Observable<PostEntity | undefined> = this.store.select(selectPost);
  // comments$ = this.post$.pipe(
  //   filter((post) => !!post),
  //   switchMap((post) => this.store.select(selectComments(post?.id as string)))
  // );

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    console.log('post');
    // this.post$.subscribe((p) => {
    //   console.log('post: ', p);
    // });
  }
}
