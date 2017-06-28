import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { NavigationLink } from '../../../models/NavigationLink';
import {Project} from '../../../models/domain/Project';

import {DataSyncService} from '../../../shared/services/utilities/data-sync.service';
import {LookupDataService} from '../../../shared/services/utilities/lookup-data.service';

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

  constructor(private _router: Router, private _dataSync: DataSyncService, private _lookup: LookupDataService) {

      this._lookup.getLeftSidebar()
          .then(result => {

              this.navigationLinks = result;
          });

      this._lookup.getSettingsMenu()
          .then(result => {

              this.settingLinks = result;
          });

      this.inSettings = false;
  }

  // TODO: Add mechanism to load navigation if a Project was previously selected.
  ngOnInit () {

      this._dataSync.project$
          .subscribe(
              (project) => {

                  if (sessionStorage.getItem('project')) {

                      this._project = JSON.parse(sessionStorage.getItem('project'));
                  }
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

      this._project = project;

      if (project) {

          this.navigationLinks.forEach((navLink: NavigationLink) => {

              if (navLink.Action === '/project') {

                  navLink.Title = 'Change Project';
              }
          });

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

      if (navLink.Action === '/project') {

          navLink.Title = 'Select Project';
          this.clearProject();
      }

      this._router.navigate([navLink.Action]);
  }

  collapseView () {

      this.inSettings = !this.inSettings;
  }

  clearProject () {

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
