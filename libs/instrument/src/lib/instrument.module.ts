import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PostModule } from '@united/social';
import { InstrumentComponent } from './containers/instrument/instrument.component';
import { InstrumentRoutingModule } from './instrument-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, InstrumentRoutingModule, PostModule],
  declarations: [InstrumentComponent],
})
export class InstrumentModule {}
