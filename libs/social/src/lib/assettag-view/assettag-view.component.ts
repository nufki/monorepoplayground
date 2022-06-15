import { ActivatedRoute, Router } from '@angular/router';
import {
  AfterViewChecked,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import SwiperCore, { Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { AssetTagEntity } from '../+state/post.models';

SwiperCore.use([Pagination]);
@Component({
  selector: 'united-assettag-view',
  templateUrl: './assettag-view.component.html',
  styleUrls: ['./assettag-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AssettagViewComponent implements AfterViewChecked {
  @Input() assetTags: AssetTagEntity[] | undefined;
  @ViewChild('swiper') swiper: SwiperComponent | undefined;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  config: SwiperOptions = {
    slidesPerView: 8,
    spaceBetween: 15,
    slidesOffsetBefore: 15,
    // navigation: true,
    // pagination: true,
    autoHeight: true,
    scrollbar: { draggable: true },
  };

  ngAfterViewChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  /***************************************************************************
   * Navigate to instrument details
   * [routerLink]="['instruments/details', assetTag.symbol]"
   ***************************************************************************/
  showInstrumentDetails(assetTag: string) {
    // Already in post-details?
    if (this.router.url.indexOf('post-details') > 0) {
      console.log('xxxx');
      this.router.navigate(['instruments/details/' + assetTag]);
    } else if (this.router.url.indexOf('instruments/details') > 0) {
      this.router.navigate(['../' + assetTag], {
        relativeTo: this.activatedRoute,
      });
    }
    // In post-list overview
    else {
      this.router.navigate(['instruments/details/' + assetTag], {
        relativeTo: this.activatedRoute,
      });
    }
  }

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  shorten(symbol: string) {
    const l = symbol.indexOf(':');
    if (l > 0) {
      return symbol.substring(0, l);
    }
    return symbol;
  }
}
