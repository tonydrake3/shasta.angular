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

    _projectSubscription;
    _projects: Project[];

    constructor (private _router: Router, private _projectService: ProjectService,
        private _dataSync: DataSyncService) { }

    ngOnInit () {

        console.log('ProjectSelectionComponent OnInit');
        this._projectService.getLatest();
        this._projectSubscription = this._projectService.projects$
            .subscribe(
                (projects) => {
                    this._projects = projects['Value'];
                    console.log('ProjectSelectionComponent projectService callback', this._projects);
                },
                (error) => {
                    console.log(error);
                }
            );

        this._dataSync.project$
            .subscribe(
                (project) => {
                    console.log('ProjectSelectionComponent dataSync callback', project);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    ngOnDestroy () {

        this._projectSubscription.unsubscribe();
    }

    selectProject (project: Project) {

        console.log('ProjectSelectionComponent selectProject', project);
        this._dataSync.setProject(project);
        sessionStorage.setItem('project', JSON.stringify(project));
        // this._router.navigate([routeName.project, project.Id]);
    }
}
