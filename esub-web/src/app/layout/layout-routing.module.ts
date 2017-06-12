import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { AuthGuard } from '../shared/services/authentication/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'trackpoint', loadChildren: '../trackpoint/trackpoint.module#TrackpointModule' },
            { path: 'time-expenses', loadChildren: '../time-expenses/time-expenses.module#TimeExpensesModule' }
        ]
    }
];

export const LayoutRoutingModule = RouterModule.forChild(routes);
