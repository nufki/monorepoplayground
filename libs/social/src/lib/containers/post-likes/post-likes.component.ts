import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostEntity } from '../../+state/post.models';
import { selectPost } from '../../+state/post.selectors';

@Component({
  selector: 'united-post-likes',
  templateUrl: './post-likes.component.html',
  styleUrls: ['./post-likes.component.css'],
})
export class PostLikesComponent implements OnInit {
  post$: Observable<PostEntity | undefined> = this.store.select(selectPost);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    console.log('post');
    this.post$.subscribe((p) => {
      console.log('post: ', p);
    });
  }
}