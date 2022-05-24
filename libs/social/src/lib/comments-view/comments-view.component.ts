import { CommentEntity, LikeEntity } from './../+state/post.models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'united-comments-view',
  templateUrl: './comments-view.component.html',
  styleUrls: ['./comments-view.component.css'],
})
export class CommentsViewComponent implements OnInit {
  @Input() comments: CommentEntity[] | undefined;
  @Output() commentLike = new EventEmitter<string>();

  constructor(
    private postService: PostService // TODO: this should be a utility which is used for checking self-like etc.
  ) {
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

  isSelfLike(likes: LikeEntity[]) {
    return this.postService.isSelfLike(likes);
  }
}
