import { Routes } from '@angular/router';
import { InformationViewComponent } from './components/information-view/information-view.component';

export const InformationRoutes: Routes = [
  {
    path: '',
    component: InformationViewComponent,
  },
  { path: '*', redirectTo: '/menu/info' }
]
