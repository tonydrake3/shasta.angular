import { Component, Input, OnInit } from '@angular/core';

import { NavigationLink } from '../../../models/NavigationLink';

// TODO delete me
import { DEVMockDataService } from '../../../shared/DEV-mock-data.service';
import {ProjectService} from '../../../features/projects/project.service';
import {Project} from '../../../models/domain/Project';
import {Router} from '@angular/router';
import {routeName} from '../../../models/configuration/routeName';
import {settingSidebarConfiguration, sidebarConfiguration} from '../../../models/configuration/menuConfiguration';
import {DataSyncService} from '../../../shared/services/utilities/data-sync.service';

@Component({
    selector: 'esub-app-sidenav-menu',
    styles: [],
    templateUrl: './sidenav-menu.component.html'
})

export class AppSidenavMenuComponent implements OnInit {
    public navigationLinks: NavigationLink[];
    public settingLinks: NavigationLink[];
    public _project: Project;
    public inSettings: boolean;

  constructor(private devMockDataService: DEVMockDataService, private _router: Router,
              private _dataSync: DataSyncService) {

      this.navigationLinks = sidebarConfiguration;

      this.settingLinks = settingSidebarConfiguration;

      this.inSettings = false;
  }

  ngOnInit () {
      console.log('Sidebar ngOnInit');

      this._dataSync.project$
          .subscribe(
              (project) => {
                  console.log('Sidebar ctor subscription this._project before', this._project);
                  if (sessionStorage.getItem('project')) {

                      this._project = JSON.parse(sessionStorage.getItem('project'));
                  }
                  console.log('Sidebar ctor subscription this._project after', this._project);
                  if (!this._project || (this._project && this._project.Id !== project.Id)) {

                      this.projectUpdate(project);
                  }
              },
              error => {
                  console.log('Error', error);
              }
          )
  }

  projectUpdate (project: Project) {

      console.log('projectUpdate start', project);
      this._project = project;

      if (project) {

          this.navigationLinks.forEach((navLink: NavigationLink) => {

              if (navLink.Key === '@project') {
                  navLink.Visible = true;
                  navLink.Title = this._project.Name;
                  navLink.Action = '/project/summary/' + project.Id;
                  this.navigation(navLink);
              }
          });
      }
  }

  navigation (navLink: NavigationLink) {

      console.log('navigation', navLink);
      if (navLink.Action === '/project') {

          this.clearProject();
      }

      this._router.navigate([navLink.Action]);
  }

  collapseView () {
      this.inSettings = !this.inSettings;
  }

  clearProject () {

      console.log('Clear Project');
      sessionStorage.removeItem('project');
      this._project = undefined;
      this.navigationLinks.forEach((link: NavigationLink) => {

          if (link.Key === '@project') {
              link.Visible = false;
              link.Title = '';
          }
      });
  }
}
