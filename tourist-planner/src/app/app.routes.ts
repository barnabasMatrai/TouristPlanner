import { Routes } from '@angular/router';
import { Register } from './components/views/register/register';
import { Login } from './components/views/login/login';

export const routes: Routes = [
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'login',
    component: Login,
  },
];