import { CommentEntity } from './../+state/post.models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'united-comments-view',
  templateUrl: './comments-view.component.html',
  styleUrls: ['./comments-view.component.css'],
})
export class CommentsViewComponent implements OnInit {
  @Input() comments: CommentEntity[] | undefined;
  @Output() commentLike = new EventEmitter<string>();

  constructor() {
    console.log('CommentsViewComponent');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  likeActionMenu(comment: CommentEntity) {
    console.log('Like Comment clicked...');
    this.commentLike.emit(comment.id);
  }

  showLikes(comment: CommentEntity) {
    console.log('show likes clicked...');
  }
}
