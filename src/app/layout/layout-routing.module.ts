import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/services/guards/auth-guard.service';

import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CompanySelectionComponent } from '../features/company/company-selection.component';
import {CompanyGuard} from '../shared/services/guards/company-guard.service';
import {ProjectSelectionComponent} from '../features/projects/project-selection.component';
import {ProjectGuard} from '../shared/services/guards/project-guard.service';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        children: [
            { path: '', redirectTo: 'company', pathMatch: 'full' },
            { path: 'company', component: CompanySelectionComponent },
            { path: 'project', component: ProjectSelectionComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'trackpoint', loadChildren: '../features/trackpoint/trackpoint.module#TrackpointModule' },
            { path: 'time-expenses', loadChildren: '../features/time-expenses/time-expenses.module#TimeExpensesModule' }
        ]
    }
];

export const LayoutRoutingModule = RouterModule.forChild(routes);
