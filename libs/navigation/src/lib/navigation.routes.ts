import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import { Routes } from '@angular/router';

export enum NavigationRoutesNames {
  HOME = 'home',
  TRADING = 'trading',
  INSTRUMENT = 'instruments',
}

export const defaultRoute = NavigationRoutesNames.HOME;

export const NAVIGATION_ROUTES: Routes = [
  {
    path: '',
    component: BottomNavigationComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: defaultRoute,
      },
      {
        path: NavigationRoutesNames.HOME,
        loadChildren: () =>
          import('@united/social').then((module) => module.PostModule),
      },
      {
        path: NavigationRoutesNames.TRADING,
        // loadChildren: () =>
        //   import('@yeekatee/trading').then((module) => module.TradingModule),
      },
      {
        path: NavigationRoutesNames.INSTRUMENT,
        // loadChildren: () =>
        //   import('@yeekatee/instruments-feature-details').then((module) => module.InstrumentsFeatureDetailsModule),
      },
    ],
  },
];
