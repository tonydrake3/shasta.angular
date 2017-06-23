import {Component, OnDestroy, OnInit} from '@angular/core';
import { ProjectService } from './project.service';
import {Project} from '../../models/domain/Project';
import {Router} from '@angular/router';
import {routeName} from '../../models/configuration/routeName';
import {DataSyncService} from '../../shared/services/utilities/data-sync.service';

@Component({
    styles: [],
    templateUrl: './project-selection.component.html'
})
export class ProjectSelectionComponent implements OnInit, OnDestroy {

    _projectServiceSubscription;
    _projects: Project[];

    constructor (private _router: Router, private _projectService: ProjectService,
        private _dataSync: DataSyncService) { }

    ngOnInit () {

        this._projectService.getLatest();
        this._projectServiceSubscription = this._projectService.projects$
            .subscribe(
                (projects) => {
                    this._projects = projects['Value'];
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    ngOnDestroy () {

        this._projectServiceSubscription.unsubscribe();
    }

    selectProject (project: Project) {

        this._dataSync.setProject(project);
        sessionStorage.setItem('project', JSON.stringify(project));
    }

    createProject () {

        this._router.navigate([routeName.project, 'create']);
    }
}
