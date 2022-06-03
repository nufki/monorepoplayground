import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './containers/timeline/timeline.component';

export enum MyHomeRoutesNames {
  MYHOME = 'myhome',
}

export const defaultRoute = MyHomeRoutesNames.MYHOME;

export const POST_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TimelineComponent,
  },
  {
    path: defaultRoute,
    component: TimelineComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(POST_ROUTES)],
  exports: [RouterModule],
})
export class MyHomeRoutingModule {}
