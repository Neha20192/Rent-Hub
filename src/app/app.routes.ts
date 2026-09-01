import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { PropertyDetails } from './features/properties/property-details/property-details';
import { Login } from './features/auth/login/login';
import { authGuard } from './core/guards/auth-guard';
import { Createpost } from './features/createpost/createpost';
import { Register } from './features/auth/register/register';
import { Editpost } from './features/editpost/editpost';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'properties/:id',
        component: PropertyDetails,
        canActivate: [authGuard]
    },
    { path: 'create-post', component: Createpost },
    { path: 'register', component: Register },
    { path: 'edit-post/:id', component: Editpost },
];
