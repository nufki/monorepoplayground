import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  deletePost,
  initAssetTagFeed,
  initHomeTimeline,
} from '../../+state/post.actions';
import { PostEntity } from '../../+state/post.models';
import {
  getAllPosts,
  getPostsError,
  getPostsLoaded,
} from '../../+state/post.selectors';
import { likeUnlikePost } from './../../+state/post.actions';

@Component({
  selector: 'united-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnChanges {
  postsLoaded$: Observable<boolean | undefined> =
    this.store.select(getPostsLoaded);

  posts$: Observable<PostEntity[]>;
  postsError$: Observable<any>;
  @Input() assetTag: string | undefined;
  @Input() timelineUpdate: Date | undefined;
  @Input() assetTagUpdate: Date | undefined;

  constructor(
    private store: Store,
    private router: Router,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute
  ) {
    this.posts$ = store.select(getAllPosts);
    this.postsError$ = store.select(getPostsError);

    this.postsError$.subscribe(async (error) => {
      if (error) {
        const toast = await this.toastController.create({
          message: error.error.apierror.message,
          duration: 2000,
        });
        toast.present();
      }
    });
  }

  ngOnInit(): void {
    // if (this.assetTag) {
    //   this.store.dispatch(initAssetTagFeed({ assetTag: this.assetTag }));
    // } else {
    //   this.store.dispatch(initHomeTimeline());
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('*** changes ***', changes);

    if (changes['timelineUpdate']) {
      this.store.dispatch(initHomeTimeline());
      return;
    }

    if (changes['assetTagUpdate']) {
      if (changes['assetTag']) {
        this.assetTag = changes['assetTag'].currentValue;
      }
      if (this.assetTag)
        this.store.dispatch(initAssetTagFeed({ assetTag: this.assetTag }));
    }
  }

  onPostDetail(id: string) {
    this.router.navigate(['post-details/' + id], {
      relativeTo: this.activatedRoute,
    });
  }

  onPostLike(id: string) {
    console.log('PostListComponent - post like clicked: ', id);
    this.store.dispatch(likeUnlikePost({ postId: id }));
  }

  onPostDelete(id: string) {
    console.log('PostListComponent - post delete clicked: ', id);
    this.store.dispatch(deletePost({ postId: id }));
  }
}
