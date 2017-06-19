import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';

@Component({
    selector: 'esub-project-selection',
    styles: [],
    templateUrl: './project-selection.component.html',
    providers: [ ProjectService ]
})
export class ProjectSelectionComponent implements OnInit {

    _projects;

    constructor (private _projectService: ProjectService) {}

    ngOnInit () {
        this._projectService.projects$
            .subscribe(
                (projects) => {
                    console.log(projects['Value']);
                    this._projects = projects['Value'];
                },
                (error) => {
                    console.log(error);
                }
            );
    }
}
