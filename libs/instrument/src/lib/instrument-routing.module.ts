import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstrumentViewComponent } from './containers/instrument-view/instrument-view.component';
import { InstrumentListComponent } from './containers/instrument/instrument-list.component';

export enum InstrumentDetailsRoutesNames {
  INSTRUMENT_DETAILS = 'details',
}

export const defaultRoute = InstrumentDetailsRoutesNames.INSTRUMENT_DETAILS;

export const INSTRUMENT_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: defaultRoute,
  },
  {
    path: defaultRoute,
    component: InstrumentListComponent,
  },
  {
    path: defaultRoute + '/:id',
    component: InstrumentViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(INSTRUMENT_ROUTES)],
  exports: [RouterModule],
})
export class InstrumentRoutingModule {}
