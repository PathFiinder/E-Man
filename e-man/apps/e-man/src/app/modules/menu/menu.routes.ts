import { Routes } from '@angular/router';
import { TokenGuard } from '../../shared/guards/token.guard';
export const MenuRoutes: Routes = [
  {
    path: '',
    redirectTo: '/menu/info',
    pathMatch: 'full'
  },
  {
    path: 'info',
    loadChildren: () => import('../information/information.routes').then(m => m.InformationRoutes),
    canActivate: [TokenGuard]
  }
]
