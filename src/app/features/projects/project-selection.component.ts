import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../shared/components/base.component';

import { Project } from '../../models/domain/Project';
import { routeName } from '../../models/configuration/routeName';
import {statusMap} from '../../models/configuration/statusMap';
import * as _ from 'lodash';


@Component({
    styles: [],
    templateUrl: './project-selection.component.html'
})
export class ProjectSelectionComponent extends BaseComponent {

    _statuses;
    _projects: Project[];

    constructor (protected injector: Injector, private _router: Router) {
      super(injector, [
        {
          service: 'ProjectService',
          callback: 'projectServiceCallback'
        }
      ]);

      this._statuses = _.filter(statusMap, function (status) {
            return status.CanDisplay;
          });
    }

    projectServiceCallback(projects) {
      this._projects = projects['Value'];
    }

    createProject () {
        this._router.navigate([routeName.project, 'create']);
    }
}
