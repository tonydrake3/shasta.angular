import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { CompanySelectionComponent } from './company/company-selection.component';

import { AuthGuard } from '../shared/services/guards/auth-guard.service';
import { CompanyGuard } from './shared/services/guards/company-guard.service';
import { ProjectGuard } from './shared/services/guards/project-guard.service';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        children: [
            { path: '', redirectTo: 'company', pathMatch: 'full' },
            // { path: 'company', component: CompanySelectionComponent },
            { path: 'company', component: CompanySelectionComponent, canActivate: [ CompanyGuard ] },
            { path: 'project', loadChildren: './projects/project.module#ProjectModule' },
            { path: 'trackpoint', loadChildren: './trackpoint/trackpoint.module#TrackpointModule' },
            { path: 'time', loadChildren: './time-expenses/time-expenses.module#TimeExpensesModule' }
        ]
    }
];

export const HomeRoutingModule = RouterModule.forChild(routes);
