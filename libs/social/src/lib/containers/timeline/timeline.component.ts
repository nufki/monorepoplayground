import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostEntity } from '../../+state/post.models';
import { getAllPosts, getPostError } from '../../+state/post.selectors';

@Component({
  selector: 'united-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent {
  posts$: Observable<PostEntity[]>;
  postsError$: Observable<any>;

  constructor(
    private store: Store,
    private router: Router,
    private toastController: ToastController
  ) {
    this.posts$ = store.select(getAllPosts);
    this.postsError$ = store.select(getPostError);

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
}
