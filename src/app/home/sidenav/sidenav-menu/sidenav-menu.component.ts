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

    // TODO move to real service once available
    this.navigationLinks = sidebarConfiguration;

      this.settingLinks = settingSidebarConfiguration;

      this.inSettings = false;

      this._dataSync.project$
          .subscribe(
              (project) => {
                  // console.log('Sidebar ctor subscription', project);
                  this.projectUpdate(project);
              },
              error => {
                  console.log('Error', error);
              }
          )
  }

  ngOnInit () {
      console.log('Sidebar ngOnInit');
  }

  projectUpdate (project: Project) {

      this._project = project;
      console.log('Sidebar ProjectUpdate', project);

      if (project) {

          this.navigationLinks.forEach((navLink: NavigationLink) => {

              if (navLink.Key === '@project') {
                  navLink.Visible = true;
                  navLink.Title = this._project.Name;
                  navLink.Action = 'summary/' + this._project.Id;

                  navLink.Children.forEach((navItem: NavigationLink) => {

                      if (navItem.Key === 'summary') {

                          navItem.Action = '/project/summary';
                          navItem.Key = this._project.Id;
                      }
                  });
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
}
