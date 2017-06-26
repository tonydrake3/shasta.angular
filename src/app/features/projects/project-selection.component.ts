import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../shared/components/base.component';

import { Project } from '../../models/domain/Project';
import { routeName } from '../../models/configuration/routeName';
import { DataSyncService } from '../../shared/services/utilities/data-sync.service';

@Component({
    styles: [],
    templateUrl: './project-selection.component.html'
})
export class ProjectSelectionComponent extends BaseComponent {

    _projects: Project[];

    constructor (protected injector: Injector, private _router: Router, private _dataSync: DataSyncService) {
      super(injector, [
        {
          service: 'ProjectService',
          callback: 'projectServiceCallback'
        }
      ]);
    }

    projectServiceCallback(projects) {
      this._projects = projects['Value'];
    }

    selectProject (project: Project) {
        this._dataSync.setProject(project);
        sessionStorage.setItem('project', JSON.stringify(project));
    }

    createProject () {
        this._router.navigate([routeName.project, 'create']);
    }
}
