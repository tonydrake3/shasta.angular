import { Routes, RouterModule } from '@angular/router';
import {ProjectSelectionComponent} from './project-selection.component';
import {ProjectSummaryComponent} from './project-summary/project-summary.component';
import {DailyReportsComponent} from './daily-reports/daily-reports.component';
import {ProjectRfiComponent} from './project-rfi/project-rfi.component';
import {ProjectSubmittalsComponent} from './project-submittals/project-submittals.component';
import {ProjectSelectionCardComponent} from './project-selection-card/project-selection-card.component';
import {ProjectComponent} from './project.component';

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
          },
          { path: 'summary', component: ProjectSummaryComponent },
          { path: 'summary/:id', component: ProjectSummaryComponent },
        ]
    }
];

export const ProjectRoutingModule = RouterModule.forChild(ProjectRoutes);

export const routedProjectComponents = [ ProjectComponent, ProjectSelectionComponent, ProjectSummaryComponent, DailyReportsComponent,
    ProjectRfiComponent, ProjectSubmittalsComponent, ProjectSelectionCardComponent ];
