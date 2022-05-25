import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PostEffects } from './+state/post.effects';
import * as fromPost from './+state/post.reducer';
import { PostDetailsComponent } from './containers/post-details/post-details.component';
import { PostListComponent } from './containers/post-list/post-list.component';
import { PostService } from './post.service';
import { PostDetailsRoutingModule } from './post-details-routing.module';
import { PostItemViewComponent } from './post-item-view/post-item-view.component';
import { CommentsViewComponent } from './comments-view/comments-view.component';
import { LikesViewComponent } from './likes-view/likes-view.component';
import { PostLikesComponent } from './containers/post-likes/post-likes.component';
import { CommentLikeComponent } from './containers/comment-like/comment-like.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PostDetailsRoutingModule,
    StoreModule.forFeature(fromPost.POST_FEATURE_KEY, fromPost.reducer),
    EffectsModule.forFeature([PostEffects]),
  ],
  declarations: [
    PostItemViewComponent,
    PostDetailsComponent,
    PostListComponent,
    CommentsViewComponent,
    LikesViewComponent,
    PostLikesComponent,
    CommentLikeComponent,
  ],
  exports: [PostListComponent, PostItemViewComponent, PostDetailsComponent],
  providers: [PostService],
})
export class PostModule {}
