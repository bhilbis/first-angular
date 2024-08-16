
import { Routes, provideRouter } from '@angular/router';
import { LoginPageComponent } from './authentication/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterPageComponent } from './authentication/register-page/register-page.component';
import { ServiceComponent } from './pages/service/service.component';
import { authGuard } from './auth/auth.guard';
import { ChangePasswordComponent } from './authentication/change-password/change-password.component';
import { MainLayoutComponent } from './main-layout.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    { 
        path: '',   
        redirectTo: '/login', 
        pathMatch: 'full' 
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { 
                path: 'home',
                title: 'HomePage',
                component: HomePageComponent,
                canActivate: [authGuard]
            },
            {
                path: 'service',
                title: 'ServicePage',
                component: ServiceComponent,
                canActivate: [authGuard]
            },
            {
                path: 'about',
                title: 'AboutPage',
                component: AboutComponent,
                canActivate: [authGuard]
            },
            {
                path: 'contact',
                title: 'ContactPage',
                component: ContactComponent,
                canActivate: [authGuard]
            },
        ]
    },
    { 
        path: 'login',
        title: 'LoginPage',
        component: LoginPageComponent,
    },
    {
        path: 'register',
        title: 'RegisterPage',
        component: RegisterPageComponent
    },
    {
        path: 'change-password',
        title: 'ChangePasswordPage',
        component: ChangePasswordComponent,
        canActivate: [authGuard]
    },
];

// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
// })

export class AppRoutingModule { }
