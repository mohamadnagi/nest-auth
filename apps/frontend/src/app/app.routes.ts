import { Routes } from '@angular/router';
import { UsersListComponent } from './users/components/users-list/users-list.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  { path: 'users', component: UsersListComponent, canActivate: [AuthGuard], title: 'Users' },

  { path: '**', redirectTo: 'auth' },
];
