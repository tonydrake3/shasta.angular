import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import {Project} from '../../../models/domain/Project';

@Component({
    selector: 'esub-project-selection',
    styles: [],
    templateUrl: './project-selection.component.html'
})
export class ProjectSelectionComponent implements OnInit {

    _projects: Project[];

    constructor (private _projectService: ProjectService) {}

    ngOnInit () {

        console.log('Project Selection ngOnInit');
        this._projectService.getLatest();
        this._projectService.projects$
            .subscribe(
                (projects) => {
                    console.log(projects);
                    this._projects = projects['Value'];
                    console.log(this._projects);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    selectProject (project: Project) {

        this._projectService.setSelectedProject(project);
    }
}
