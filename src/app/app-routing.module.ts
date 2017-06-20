import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Page Homes
import { PageLayoutFullscreenComponent } from './page-layouts/fullscreen/fullscreen.component';
import { AuthGuard } from './shared/services/guards/auth-guard.service';
import { LoginComponent } from './login/login.component';


const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'company',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    // { path: '**', component: PageNotFound },
];

export const AppRoutingModule = RouterModule.forRoot(AppRoutes, {useHash: true});
