import { Component, Input, OnInit } from '@angular/core';

import { NavigationLink } from '../../../models/NavigationLink';

// TODO delete me
import { DEVMockDataService } from '../../../shared/DEV-mock-data.service';
import {ProjectService} from '../../../features/projects/project.service';
import {Project} from '../../../models/domain/Project';
import {Router} from '@angular/router';
import {routeName} from '../../../models/configuration/routeName';
import {settingSidebarConfiguration, sidebarConfiguration} from '../../../models/configuration/menuConfiguration';

@Component({
    selector: 'esub-app-sidenav-menu',
    styles: [],
    templateUrl: './sidenav-menu.component.html'
})

export class AppSidenavMenuComponent implements OnInit {
    public navigationLinks: NavigationLink[];
    public timeExpensesLinks: any;  // TODO type this
    public projectLinks: any;  // TODO type this
    public settingLinks: any;  // TODO type this
    public _project: Project;
    public inSettings: boolean;

  constructor(private devMockDataService: DEVMockDataService, private _projectService: ProjectService,
                private _router: Router) {

    // TODO move to real service once available
    this.navigationLinks = sidebarConfiguration;

    // // TODO this more intelligently
    // // manually construct time & expenses nav links
    // this.timeExpensesLinks = [
    //     { title: 'Timesheets ', view: 'timesheets' },
    //     { title: 'Approve Time ', view: 'approve-time' },
    //     { title: 'Export Time ', view: 'export-time' },
    // ];
    //
      this.settingLinks = settingSidebarConfiguration;

      this.inSettings = false;
  }

  ngOnInit () {
      console.log('Nav ngOnInit');
      this._projectService.selectedProject$
          .subscribe(
              (project) => {
                  console.log('sidenav selectProject subscription', project);
                  this.projectUpdate(project);
              },
              error => {
                  console.log('Error', error);
              }
          )
  }

  selectProject () {
      console.log('selectProject');
      this._project = undefined;
      this._router.navigate([routeName.project]);
  }

  projectUpdate (project: Project) {

      this._project = project;
      console.log('Nav ProjectUpdate', project);

      if (project) {

          this.navigationLinks.forEach((navLink: NavigationLink) => {

              if (navLink.Key === '@project') {
                  navLink.Visible = true;
                  navLink.Title = this._project.Name;
                  // navLink.Action = 'project/' + this._project.Id;
              }
          });
      } else {

          this.navigationLinks.forEach((navLink: NavigationLink) => {

              if (navLink.Key === '@project') {
                  navLink.Visible = false;
                  navLink.Title = '';
                  navLink.Action = '';
              }
          });
      }
  }

  collapseView () {
      this.inSettings = !this.inSettings;
  }

  loadProjectSidebar (project: Project) {

      this._project = project;
      // TODO this more intelligently
      // manually construct project nav links
      this.projectLinks = [
          { title: 'Create Project ', view: 'create' },
          { title: 'Project Summary ', view: 'summary' },
          {
              '$id': '1',
              'Action': 'http://dev-shasta.esubonline.com/TRACKpoint/versions/v61/Shasta/Bridge.asp?s=1&m=FieldNotes&session=bearerOY&xtid=2',
              'Children': null,
              'Key': '@fieldNotes',
              'System': 1,
              'Title': 'Field Notes',
              'iconName': 'speaker_notes'
          },
          { title: 'Daily Reports ', view: 'daily-reports' },
          { title: 'RFIs ', view: 'rfi' },
          { title: 'Submittals ', view: 'submittals' },
          {
              '$id': '5',
              'Action': 'http://dev-shasta.esubonline.com/TRACKpoint/versions/v61/Shasta/Bridge.asp?s=1&m=FieldNotes&session=bearerOY&xtid=2',
              'Children': null,
              'Key': '@fieldNotes',
              'System': 1,
              'Title': 'Issues',
              'iconName': 'alarm'
          },
          { title: 'Settings ', view: 'settings' },
      ];
  }
}
