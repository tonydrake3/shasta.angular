import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import {Project} from '../../models/domain/Project';
import {Router} from '@angular/router';
import {routeName} from '../../models/configuration/routeName';

@Component({
    styles: [],
    templateUrl: './project-selection.component.html'
})
export class ProjectSelectionComponent implements OnInit {

    _projects: Project[];

    constructor (private _router: Router, private _projectService: ProjectService) { }

    ngOnInit () {

        console.log('Project Selection ngOnInit', this._projectService.selectedProject$);
        if (this._projectService.selectedProject$) {

            this._projectService.setSelectedProject(null);
        }

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
    }

    selectProject (project: Project) {

        console.log('ProjectSelection selectProject');
        this._projectService.setSelectedProject(project);
        // this._router.navigate([routeName.project, project.Id]);
    }
}
