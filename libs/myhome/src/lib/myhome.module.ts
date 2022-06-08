import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SocialModule } from '@united/social';
import { TimelineComponent } from './containers/timeline/timeline.component';
import { MyHomeRoutingModule } from './myhome-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MyHomeRoutingModule,
    CommonModule,
    IonicModule,
    SocialModule,
  ],
  declarations: [TimelineComponent],
})
export class MyhomeModule {}
