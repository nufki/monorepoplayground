import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostEntity } from '../+state/post.models';

@Component({
  selector: 'united-likes-view',
  templateUrl: './likes-view.component.html',
  styleUrls: ['./likes-view.component.css'],
})
export class LikesViewComponent implements OnInit {
  @Input() post: PostEntity | undefined;

  constructor() {
    console.log('LikesViewComponent - constructor', this.post);
  }

  ngOnInit(): void {
    console.log('LikesViewComponent - ngOnInit', this.post);
  }
}
