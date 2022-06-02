import { Component, Input, OnInit } from '@angular/core';
import { LikeEntity } from './../+state/post.models';

@Component({
  selector: 'united-likes-view',
  templateUrl: './likes-view.component.html',
  styleUrls: ['./likes-view.component.css'],
})
export class LikesViewComponent implements OnInit {
  @Input() likes: LikeEntity[] | undefined;

  constructor() {
    console.log('LikesViewComponent - constructor', this.likes);
  }

  ngOnInit(): void {
    console.log('LikesViewComponent - ngOnInit', this.likes);
  }
}
