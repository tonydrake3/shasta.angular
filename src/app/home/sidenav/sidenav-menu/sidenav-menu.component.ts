import { Component, Input, OnInit } from '@angular/core';

import { NavigationLink } from '../../../models/NavigationLink';

// TODO delete me
import { DEVMockDataService } from '../../../shared/DEV-mock-data.service';
import {ProjectService} from '../../../features/projects/project.service';
import {Project} from '../../../models/domain/Project';
import {Router} from '@angular/router';
import {routeName} from '../../../models/configuration/routeName';

@Component({
    selector: 'esub-app-sidenav-menu',
    styles: [],
    templateUrl: './sidenav-menu.component.html'
})

export class AppSidenavMenuComponent implements OnInit {
    public navigationLinks: NavigationLink[];
    public timeExpensesLinks: any;  // TODO type this
    public projectLinks: any;  // TODO type this
    public _project: Project;

  constructor(private devMockDataService: DEVMockDataService, private _projectService: ProjectService,
                private _router: Router) {

    // TODO move to real service once available
    this.navigationLinks = devMockDataService.navLinks;

    // TODO this more intelligently
    // manually construct time & expenses nav links
    this.timeExpensesLinks = [
        { title: 'Timesheets ', view: 'timesheets' },
        { title: 'Approve Time ', view: 'approve-time' },
        { title: 'Export Time ', view: 'export-time' },
    ];
  }

  ngOnInit () {

      this._projectService.selectedProject$
          .subscribe(
              (project) => {
                  this.loadProjectSidebar(project);
              },
              error => {
                  console.log('Error', error);
              }
          )
  }

  selectProject () {
      console.log('selectProject');
      this._router.navigate([routeName.project]);
  }

  loadProjectSidebar (project: Project) {

      this._project = project
      // TODO this more intelligently
      // manually construct project nav links
      this.projectLinks = [
          { title: 'Create Project ', view: 'create' },
          { title: 'Project Summary ', view: 'summary' },
          { title: 'Field Notes ', view: 'field-notes' },
          { title: 'Daily Reports ', view: 'daily-reports' },
          { title: 'RFIs ', view: 'rfi' },
          { title: 'Submittals ', view: 'submittals' },
      ];
  }
}
