import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import {Project} from '../../../models/domain/Project';

@Component({
    selector: 'esub-project-selection',
    styles: [],
    templateUrl: './project-selection.component.html',
    providers: [ ProjectService ]
})
export class ProjectSelectionComponent implements OnInit {

    _projects: Project[];

    constructor (private _projectService: ProjectService) {}

    ngOnInit () {
        this._projectService.projects$
            .subscribe(
                (projects) => {
                    this._projects = <Project[]>projects['Value'];
                    console.log(this._projects);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    selectProject (project: Project) {

        console.log(project);
    }
}
