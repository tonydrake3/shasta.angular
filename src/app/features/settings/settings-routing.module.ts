import { Routes, RouterModule } from '@angular/router';
import {SettingsComponent} from 'app/features/settings/settings.component';
import {AdminSettingsComponent} from './admin-settings/admin-settings.component';
import {ListManagementComponent} from './list-management/list-management.component';
import {ProjectManagementComponent} from './project-management/project-management.component';

export const SettingRoutes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [
            {
                path: 'admin-settings',
                component: AdminSettingsComponent
            },
            {
                path: 'list-management',
                component: ListManagementComponent
            },
            {
                path: 'project-management',
                component: ProjectManagementComponent
            },
        ]
    }
];

export const SettingsRoutingModule = RouterModule.forChild(SettingRoutes);

export const routedSettingsComponents = [ SettingsComponent, AdminSettingsComponent, ListManagementComponent,
    ProjectManagementComponent ];
