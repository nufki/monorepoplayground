import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import { IonicModule } from '@ionic/angular';
import { NavigationRoutingModule } from './navigation-routing.module';

@NgModule({
  imports: [CommonModule, NavigationRoutingModule, IonicModule],
  declarations: [BottomNavigationComponent],
  exports: [BottomNavigationComponent],
})
export class NavigationModule {}
