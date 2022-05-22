import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PostEntity } from '../+state/post.models';

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
}
