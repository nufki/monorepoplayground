import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { CommentEntity, LikeEntity } from './../+state/post.models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'united-comments-view',
  templateUrl: './comments-view.component.html',
  styleUrls: ['./comments-view.component.scss'],
})
export class CommentsViewComponent implements OnInit {
  @Input() comments: CommentEntity[] | undefined;
  @Output() commentLike = new EventEmitter<string>();
  @Output() commentDelete = new EventEmitter<string>();
  @Output() commentEdit = new EventEmitter<CommentEntity>();

  constructor(
    private postService: PostService, // TODO: this should be a utility which is used for checking self-like etc.
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  likeActionMenu(comment: CommentEntity) {
    console.log('CommentsViewComponent - Like Comment clicked...');
    this.commentLike.emit(comment.id);
  }

  async commentAtionMenu(comment: CommentEntity) {
    console.log('CommentsViewComponent - Comment Action Menu clicked...');

    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Delete Comment',
          icon: 'trash-outline',
          handler: async () => {
            const alert = await this.alertController.create({
              header: 'Delete your comment?',
              message: 'Do you really want to delete your comment?',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: (cancel) => {
                    console.log('Cancel');
                  },
                },
                {
                  text: 'OK',
                  handler: () => {
                    console.log('Delete Comment clicked');
                    this.commentDelete.emit(comment.id);
                  },
                },
              ],
            });
            await alert.present();
          },
        },
        {
          text: 'Edit Comment',
          icon: 'create-outline',
          handler: () => {
            console.log('Edit Comment clicked', comment);
            this.commentEdit.emit(comment);
          },
        },
        {
          text: 'Share Comment',
          icon: 'share-outline',
          handler: () => {
            console.log('Share clicked');
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }

  showLikes(comment: CommentEntity) {
    console.log('CommentsViewComponent - show likes clicked...');
    if (comment.likes.length > 0) {
      this.router.navigate(['comments/' + comment.id + '/likes'], {
        relativeTo: this.activatedRoute,
      });
    }
  }

  isSelfLike(likes: LikeEntity[]) {
    return this.postService.isSelfLike(likes);
  }
}
