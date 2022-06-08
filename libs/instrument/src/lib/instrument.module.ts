import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SocialModule } from '@united/social';
import { InstrumentComponent } from './containers/instrument/instrument.component';
import { InstrumentRoutingModule } from './instrument-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, InstrumentRoutingModule, SocialModule],
  declarations: [InstrumentComponent],
})
export class InstrumentModule {}
