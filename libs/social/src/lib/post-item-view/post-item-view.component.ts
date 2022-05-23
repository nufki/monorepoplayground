import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PostEntity } from '../+state/post.models';
import { LikeEntity } from './../+state/post.models';

@Component({
  selector: 'united-post-item-view',
  templateUrl: './post-item-view.component.html',
  styleUrls: ['./post-item-view.component.css'],
})
export class PostItemViewComponent implements OnInit {
  @Input() post: PostEntity | undefined;
  @Output() showPostDetail = new EventEmitter<string>();

  constructor(private router: Router) {
    console.log('PostItemViewComponent');
  }

  ngOnInit(): void {
    console.log('PostItemViewComponent - ngOnInit', this.post);
  }

  likeActionMenu() {
    console.log('like button pressed');
  }

  /***************************************************************************
   * Navigate to single post respectively commment section where all the
   * comments to the posts are shown.
   ***************************************************************************/
  public async showPostComments() {
    if (this.post) {
      this.showPostDetail.emit(this.post.id);
    }
  }

  /***************************************************************************
   * Return comment text
   ***************************************************************************/
  public printCommentText(): string {
    if (this.post) {
      if (this.post.commentCnt === 0) {
        return '';
      } else if (this.post.commentCnt === 1) {
        return '1 comment';
      } else {
        return this.post.commentCnt + ' comments';
      }
    }
    return '0 comments';
  }

  public selfLike(): boolean {
    if (this.post) {
      return (
        this.post.likes.find((like: LikeEntity) => {
          if (like.user.username === 'nufki81') return true;
          else return false;
        }) !== undefined
      );
    }
    return false;
  }

  /***************************************************************************
   * Evaluate and show like text
   ***************************************************************************/
  public printLikeText(likes: LikeEntity[]): string {
    let iLiked = false;
    // Handle no likes
    if (likes.length === 0) {
      return 'be the first who liked';
    }
    likes.forEach((like) => {
      if (like.user.username === 'nufki81') {
        iLiked = true;
        return;
      }
    });
    if (likes.length === 1 && iLiked) {
      return 'you liked';
    }
    if (likes.length > 1 && iLiked) {
      if (likes.length === 2) {
        return 'you and ' + (likes.length - 1) + ' other liked';
      } else {
        return 'you and ' + (likes.length - 1) + ' others liked';
      }
    }
    return likes.length + ' liked';
  }

  /***************************************************************************
   * Navigate to single post respectively commment section where all the
   * comments to the posts are shown.
   ***************************************************************************/
  public async showLikes(post: PostEntity) {
    console.log('like pressed');
  }
}
