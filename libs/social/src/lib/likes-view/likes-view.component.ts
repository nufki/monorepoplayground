import { Component, Input } from '@angular/core';
import { LikeEntity } from './../+state/post.models';

@Component({
  selector: 'united-likes-view',
  templateUrl: './likes-view.component.html',
  styleUrls: ['./likes-view.component.scss'],
})
export class LikesViewComponent {
  @Input() likes: LikeEntity[] | undefined;

  constructor() {
    console.log('LikesViewComponent - constructor');
  }
}
