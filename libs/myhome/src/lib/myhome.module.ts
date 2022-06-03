import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PostModule } from '@united/social';
import { TimelineComponent } from './containers/timeline/timeline.component';
import { MyHomeRoutingModule } from './myhome-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MyHomeRoutingModule,
    CommonModule,
    IonicModule,
    PostModule,
  ],
  declarations: [TimelineComponent],
})
export class MyhomeModule {}
