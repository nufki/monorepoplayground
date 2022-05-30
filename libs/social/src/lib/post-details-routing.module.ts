import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentLikeComponent } from './containers/comment-like/comment-like.component';
import { PostDetailsComponent } from './containers/post-details/post-details.component';
import { PostLikesComponent } from './containers/post-likes/post-likes.component';
import { PostListComponent } from './containers/post-list/post-list.component';
import { LikesViewComponent } from './likes-view/likes-view.component';

export enum PostDetailsRoutesNames {
  POST_DETAILS = 'post-details',
}

export const defaultRoute = PostDetailsRoutesNames.POST_DETAILS;

export const POST_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: defaultRoute,
  },
  {
    path: defaultRoute,
    component: PostListComponent,
  },
  {
    path: defaultRoute + '/:id',
    component: PostDetailsComponent,
  },
  {
    path: defaultRoute + '/:id/likes',
    component: PostLikesComponent,
  },
  {
    path: defaultRoute + '/:id/comments/:id/likes',
    component: CommentLikeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(POST_ROUTES)],
  exports: [RouterModule],
})
export class PostDetailsRoutingModule {}
