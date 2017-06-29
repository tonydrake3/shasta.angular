import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../shared/components/base.component';

import { Project } from '../../models/domain/Project';
import { routeName } from '../../models/configuration/routeName';
import {statusMap, StatusMap} from '../../models/configuration/statusMap';
import * as _ from 'lodash';


@Component({
    styles: [],
    templateUrl: './project-selection.component.html'
})
export class ProjectSelectionComponent extends BaseComponent {

    _statuses;
    _projects: Project[];
    filteredProjects: Project[];

    constructor (protected injector: Injector, private _router: Router) {
      super(injector, [
        {
          service: 'ProjectService',
          callback: 'projectServiceCallback'
        }
      ]);

    }

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/

    selectStatusFilter (selStatus: StatusMap) {

        this._statuses.forEach((status) => {

            if (status.Key === selStatus.Key) {

                status.IsFiltered = !status.IsFiltered;
            }
        });
        this.filter();
    }

    createProject () {
        this._router.navigate([routeName.project, 'create']);
    }

    /*****************************************************************************************************************
     * Private Helpers
     ******************************************************************************************************************/

    projectServiceCallback(projects) {

        this._statuses = _.filter(statusMap, function (status) {
            return status.CanDisplay;
        });

        this._projects = projects['Value'];

        this.filter();
    }

    private filterProject (status: StatusMap) {

        return _.filter(this._projects, function (proj) {

            return proj.Status === status.Key;
        });
    }

    private filter () {

        this.filteredProjects = new Array<Project>();

        this._statuses.forEach((map) => {

            if (map.IsFiltered) {

                this.filteredProjects = _.concat(this.filteredProjects, this.filterProject(map));
            }
        });
        this.sort();
    }

    private sort () {

        this.filteredProjects = _.orderBy(this.filteredProjects, ['Name'], ['asc']);
    }


}
