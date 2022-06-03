import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstrumentComponent } from './containers/instrument/instrument.component';

export enum InstrumentRoutesNames {
  INSTRUMENT = 'instrument',
}

export const defaultRoute = InstrumentRoutesNames.INSTRUMENT;

export const POST_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: InstrumentComponent,
  },
  {
    path: defaultRoute,
    component: InstrumentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(POST_ROUTES)],
  exports: [RouterModule],
})
export class InstrumentRoutingModule {}
