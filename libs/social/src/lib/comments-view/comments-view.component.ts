import { CommentEntity } from './../+state/post.models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'united-comments-view',
  templateUrl: './comments-view.component.html',
  styleUrls: ['./comments-view.component.css'],
})
export class CommentsViewComponent implements OnInit {
  @Input() comments: CommentEntity[] | undefined;

  constructor() {
    console.log('CommentsViewComponent');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  likeSelected(comment: CommentEntity) {
    console.log('Like Comment clicked...');
  }

  showLikes(comment: CommentEntity) {
    console.log('show likes clicked...');
  }
}
