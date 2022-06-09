import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SocialModule } from '@united/social';
import { InstrumentListComponent } from './containers/instrument/instrument-list.component';
import { InstrumentRoutingModule } from './instrument-routing.module';
import { InstrumentViewComponent } from './containers/instrument-view/instrument-view.component';

@NgModule({
  imports: [CommonModule, IonicModule, InstrumentRoutingModule, SocialModule],
  declarations: [InstrumentListComponent, InstrumentViewComponent],
})
export class InstrumentModule {}
