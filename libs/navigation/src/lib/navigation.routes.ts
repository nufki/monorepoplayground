import { Routes } from '@angular/router';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';

export enum NavigationRoutesNames {
  MYHOME = 'myhome',
  TRADING = 'trading',
  INSTRUMENTS = 'instruments',
}

export const defaultRoute = NavigationRoutesNames.MYHOME;

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
        path: NavigationRoutesNames.MYHOME,
        loadChildren: () =>
          import('@united/myhome').then((module) => module.MyhomeModule),
      },
      {
        path: NavigationRoutesNames.TRADING,
        // loadChildren: () =>
        //   import('@yeekatee/trading').then((module) => module.TradingModule),
      },
      {
        path: NavigationRoutesNames.INSTRUMENTS,
        loadChildren: () =>
          import('@united/instrument').then(
            (module) => module.InstrumentModule
          ),
      },
    ],
  },
];
