import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NAVIGATION_ROUTES } from './navigation.routes';

@NgModule({
  imports: [RouterModule.forChild(NAVIGATION_ROUTES)],
  exports: [RouterModule],
})
export class NavigationRoutingModule {}
