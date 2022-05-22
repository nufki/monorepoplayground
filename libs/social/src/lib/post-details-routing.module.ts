import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailsComponent } from './containers/post-details/post-details.component';
import { PostListComponent } from './containers/post-list/post-list.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(POST_ROUTES)],
  exports: [RouterModule],
})
export class PostDetailsRoutingModule {}
