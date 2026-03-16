import { Routes } from '@angular/router';
import { Register } from './components/views/register/register';
import { Login } from './components/views/login/login';
import { Home } from './components/views/home/home';
import { Dashboard } from './components/views/dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'login',
    component: Login,
  },
  { path: '', 
    component: Home },
  
  { path: 'dashboard',
     component: Dashboard }

];

