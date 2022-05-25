import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { PostEntity } from '../+state/post.models';
import { PostService } from '../post.service';
import { LikeEntity } from './../+state/post.models';

@Component({
  selector: 'united-post-item-view',
  templateUrl: './post-item-view.component.html',
  styleUrls: ['./post-item-view.component.css'],
})
export class PostItemViewComponent implements OnInit {
  @Input() post: PostEntity | undefined;
  @Output() showPostDetail = new EventEmitter<string>();
  @Output() postLike = new EventEmitter<string>();
  @Output() postDeleted = new EventEmitter<string>();

  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private postService: PostService // TODO: this should be a utility which is used for checking self-like etc.
  ) {
    console.log('PostItemViewComponent');
  }

  ngOnInit(): void {
    console.log('PostItemViewComponent - ngOnInit', this.post);
  }

  isSelfLike(likes: LikeEntity[]) {
    return this.postService.isSelfLike(likes);
  }

  likeActionMenu() {
    if (this.post) {
      this.postLike.emit(this.post.id);
    }
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
  public async showLikes() {
    console.log('show all user likes', this.post?.likes);
    // this.router.navigate(['likes']);
    /*
    if (this.post.likes.length === 0) return;
    const navigationExtras: NavigationExtras = {
      state: {
        post, // Unfortunatly, arrays cannot be simply handed over... thats why post and extract the likes again from there...
      },
    };
    this.router.navigate(['tabs/likes'], navigationExtras);
*/
  }

  /***************************************************************************
   * Post Menu Actions (Delete, Edit, ...)
   ***************************************************************************/
  public async postActionMenu() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Delete post',
          icon: 'trash-outline',
          handler: async () => {
            const alert = await this.alertController.create({
              header: 'Delete your post?',
              message: 'Do you really want to delete your post?',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: (cancel) => {
                    console.log('Cancel deletion');
                  },
                },
                {
                  text: 'OK',
                  handler: () => {
                    if (this.post) this.postDeleted.emit(this.post.id);
                  },
                },
              ],
            });
            await alert.present();
          },
        },
        {
          text: 'Edit post',
          icon: 'create-outline',
          handler: () => {
            console.log('Edit post');
          },
        },
        {
          text: 'Share post',
          icon: 'share-outline',
          handler: () => {
            console.log('Share post');
          },
        },
        {
          text: 'Who can see this post?',
          icon: 'eye-outline',
          handler: async () => {
            console.log('Who can see this post');
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel');
          },
        },
      ],
    });

    await actionSheet.present();
  }
}
