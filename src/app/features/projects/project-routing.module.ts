import { Routes, RouterModule } from '@angular/router';
import {ProjectSelectionComponent} from './project-selection.component';
import {ProjectSummaryComponent} from './project-summary/project-summary.component';
import {DailyReportsComponent} from './daily-reports/daily-reports.component';
import {ProjectRfiComponent} from './project-rfi/project-rfi.component';
import {ProjectSubmittalsComponent} from 'app/features/projects/project-submittals/project-submittals.component';
import {NgModule} from '@angular/core';
import {ProjectSelectionCardComponent} from './project-selection-card/project-selection-card.component';
import {HomeComponent} from '../../home/home.component';
import {ProjectComponent} from './project.component';
import {TrackpointNavigationComponent} from '../trackpoint/trackpoint.component';

// export const ProjectRoutes: Routes = [
//     { path: '', redirectTo: '/project/select', pathMatch: 'full' },
//     {path: 'project/select', component: ProjectSelectionComponent},
//     {path: ':id', component: ProjectSummaryComponent},
//     {path: 'project/daily-reports', component: DailyReportsComponent},
//     {path: 'rfi', component: ProjectRfiComponent},
//     {path: 'submittals', component: ProjectSubmittalsComponent}
// ];
//
// @NgModule({
//     imports: [RouterModule.forChild(routes)],
//     exports: [RouterModule],
// })
// export class ProjectRoutingModule { }

export const ProjectRoutes: Routes = [
    {
        path: '',
        component: ProjectComponent,
        children: [
            {
                path: '',
                component: ProjectSelectionComponent
            },
            {
                path: ':id',
                component: ProjectSummaryComponent
            },
            {
                path: 'daily-reports',
                component: DailyReportsComponent
            },
            {
                path: 'submittals',
                component: ProjectSubmittalsComponent
            },
            {
                path: 'rfi',
                component: ProjectRfiComponent
            }
        ]
    }
];

export const ProjectRoutingModule = RouterModule.forChild(ProjectRoutes);

export const routedProjectComponents = [ ProjectComponent, ProjectSelectionComponent, ProjectSummaryComponent, DailyReportsComponent,
    ProjectRfiComponent, ProjectSubmittalsComponent, ProjectSelectionCardComponent ];


