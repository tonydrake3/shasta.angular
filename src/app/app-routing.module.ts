import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Page Layouts
import { PageLayoutFullscreenComponent } from './page-layouts/fullscreen/fullscreen.component';
import { AuthGuard } from './shared/services/guards/auth-guard.service';
import { LoginComponent } from './login/login.component';


const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    // { path: '**', component: PageNotFound },
];

export const AppRoutingModule = RouterModule.forRoot(AppRoutes, {useHash: true});
