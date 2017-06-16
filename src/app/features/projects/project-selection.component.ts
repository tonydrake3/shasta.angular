import { Component } from '@angular/core';
import { ProjectService } from './project.service';

@Component({
    selector: 'esub-project-selection',
    styles: [],
    templateUrl: './project-selection.component.html',
    providers: [ ProjectService ]
})
export class ProjectSelectionComponent {

    constructor (private _projectService: ProjectService) {}

}
