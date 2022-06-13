import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { PostEntity } from '../+state/post.models';
import { PostService } from '../post.service';
import { LikeEntity } from './../+state/post.models';
import SwiperCore, { SwiperOptions } from 'swiper';

@Component({
  selector: 'united-post-item-view',
  templateUrl: './post-item-view.component.html',
  styleUrls: ['./post-item-view.component.scss'],
})
export class PostItemViewComponent {
  @Input() post: PostEntity | undefined;
  @Output() showPostDetail = new EventEmitter<string>();
  @Output() postLike = new EventEmitter<string>();
  @Output() postDeleted = new EventEmitter<string>();
  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private postService: PostService // TODO: this should be a utility which is used for checking self-like etc.
  ) {}

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
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
   * Navigate to likes overview
   ***************************************************************************/
  showPostLikes(post: PostEntity) {
    // Already in post-details?
    if (this.router.url.indexOf('post-details') > 0) {
      this.router.navigate(['likes'], {
        relativeTo: this.activatedRoute,
      });
    }
    // In post-list overview
    else {
      this.router.navigate(['post-details/' + post.id + '/likes'], {
        relativeTo: this.activatedRoute,
      });
    }
  }

  showPostComments() {
    if (this.post) {
      this.showPostDetail.emit(this.post.id);
    }
  }

  /***************************************************************************
   * Return comment text
   ***************************************************************************/
  printCommentText(): string {
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
  printLikeText(likes: LikeEntity[]): string {
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
   * Post Menu Actions (Delete, Edit, ...)
   ***************************************************************************/
  async postActionMenu() {
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
