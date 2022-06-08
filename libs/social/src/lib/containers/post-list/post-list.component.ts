import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonInfiniteScroll,
  IonRefresher,
  ToastController,
} from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  deletePost,
  loadHomeTimeline,
  loadMoreTimelinePosts,
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
export class PostListComponent implements OnChanges {
  // postsLoaded$: Observable<boolean | undefined> =
  //   this.store.select(getPostsLoaded);
  // postsLoaded$: Observable<boolean> | undefined;
  posts$: Observable<PostEntity[]>;
  postsError$: Observable<any>;
  @Input() assetTag: string | undefined;
  @Input() timelineUpdate: Date | undefined;
  @Input() assetTagUpdate: Date | undefined;
  pageNumber = 1;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll | undefined;
  @ViewChild(IonRefresher) refresher: IonRefresher | undefined;
  postsLoaded: Subscription;
  isLoading = true;

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

    this.postsLoaded = this.store
      .select(getPostsLoaded)
      .subscribe((isLoading) => {
        console.log('xxxx: ', isLoading);
        if (this.infiniteScroll && !isLoading) {
          this.infiniteScroll.complete();
          this.refresher?.complete();
          this.pageNumber++;
        }
        this.isLoading = false;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('*** changes ***', changes);
    /*
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
    */
  }

  /***************************************************************************
   * Fetch timeline posts
   * @param event: Triggered by ion-infinite-scroll or or ion-refresher
   ***************************************************************************/
  private getTimeline(event: any, isRefresh: boolean = false) {
    if (event && isRefresh) {
      // Refresh posts
      this.store.dispatch(loadHomeTimeline());
      return;
    }
    if (event) {
      // Load more and merge
      this.store.dispatch(loadMoreTimelinePosts({ page: this.pageNumber }));
    }
  }

  /***************************************************************************
   * Refresh timeline posts
   * @param event: Triggered by ion-refresher
   ***************************************************************************/
  public refresh(event: Event) {
    console.log('refresh');
    // No loading spinner as
    this.pageNumber = 0;
    this.getTimeline(event, true);
  }

  /***************************************************************************
   * Fetch older timeline posts
   * @param event: Triggered by ion-infinite-scroll
   ***************************************************************************/
  public loadMore(event: Event) {
    console.log('load more');
    this.getTimeline(event, false);
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
