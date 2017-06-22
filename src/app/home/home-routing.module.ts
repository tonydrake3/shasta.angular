import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CompanySelectionComponent } from '../features/company/company-selection.component';
import { ProjectSelectionComponent } from '../features/projects/project-selection.component';

import { AuthGuard } from '../shared/services/guards/auth-guard.service';
import { CompanyGuard } from '../shared/services/guards/company-guard.service';
import { ProjectGuard } from '../shared/services/guards/project-guard.service';
import {ProjectSummaryComponent} from '../features/projects/project-summary/project-summary.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        children: [
            { path: '', redirectTo: 'company', pathMatch: 'full' },
            { path: 'company', component: CompanySelectionComponent, canActivate: [ CompanyGuard ] },
            // { path: 'project', loadChildren: '../features/projects/project.module#ProjectModule' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'trackpoint', loadChildren: '../features/trackpoint/trackpoint.module#TrackpointModule' },
            { path: 'time-expenses', loadChildren: '../features/time-expenses/time-expenses.module#TimeExpensesModule' }
        ]
    }
];

export const HomeRoutingModule = RouterModule.forChild(routes);
