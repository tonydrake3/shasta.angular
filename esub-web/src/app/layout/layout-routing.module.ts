import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
    {
        path: 'app',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'trackpoint', loadChildren: '../trackpoint/trackpoint.module#TrackpointModule' },
            { path: 'time-expenses', loadChildren: '../time-expenses/time-expenses.module#TimeExpensesModule' }
        ]
    }
];

export const LayoutRoutingModule = RouterModule.forChild(routes);
