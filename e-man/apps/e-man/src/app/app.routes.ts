import { Route } from '@angular/router';
import { TokenGuard } from './shared/guards/token.guard';

export const E_MAN_PATH_AFTER_LOGIN = 'menu/info';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.routes').then(m => m.LoginRoutes)
  },
  {
    path: 'menu',
    loadChildren: () => import('./modules/menu/menu.routes').then(m => m.MenuRoutes),
    canActivate: [TokenGuard]
  },


  {path: '', redirectTo: E_MAN_PATH_AFTER_LOGIN, pathMatch: 'full'},
  {path: '**', redirectTo: E_MAN_PATH_AFTER_LOGIN, pathMatch: 'full'},
];
