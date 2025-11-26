import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        title: 'Login | FullDev',
        loadComponent: () => import('@features/auth/login/login').then(m => m.Login)
    },
    {
        path: 'register',
        title: 'Cadastro | FullDev',
        loadComponent: () => import('@features/auth/register/register').then(m => m.Register)
    },
    {
        path: 'register-company',
        title: 'Cadastrar empresa | FullDev',
        loadComponent: () => import('@features/auth/register-company/register-company').then(m => m.RegisterCompany)
    },
    {
        path: 'forgot',
        title: 'Esqueci a senha | FullDev',
        loadComponent: () => import('@features/auth/forgot/forgot').then(m => m.Forgot)
    },
    {
        path: '',
        canActivate: [authGuard],
        title: 'Área logada | FullDev',
        loadComponent: () => import('@features/shell/shell').then(m => m.Shell),
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard',
            },
            {
                path: 'dashboard',
                title: 'Dashboard | FullDev',
                loadComponent: () => import('@features/home/home').then(m => m.Home),
            },
        ],
    },

    {
        path: '**',
        title: 'Página não encontrada | FullDev',
        loadComponent: () => import('@features/not-found/not-found').then(m => m.NotFound),
    },
];
