import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import {Project} from '../../models/domain/Project';
import {Router} from '@angular/router';
import {routeName} from '../../models/configuration/routeName';
import {DataSyncService} from '../../shared/services/utilities/data-sync.service';

@Component({
    styles: [],
    templateUrl: './project-selection.component.html'
})
export class ProjectSelectionComponent implements OnInit {

    _projects: Project[];

    constructor (private _router: Router, private _projectService: ProjectService,
        private _dataSync: DataSyncService) { }

    ngOnInit () {

        this._projectService.getLatest();
        this._projectService.projects$
            .subscribe(
                (projects) => {
                    this._projects = projects['Value'];
                    console.log('ProjectSelection ngOnInit', this._projects);
                },
                (error) => {
                    console.log(error);
                }
            );

        this._dataSync.project$
            .subscribe(
                (project) => {
                    console.log('ProjectSelection ngOnInit dataSync', project);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    selectProject (project: Project) {

        console.log('ProjectSelection selectProject', project);
        this._dataSync.setProject(project);
        // this._router.navigate([routeName.project, project.Id]);
    }
}
