import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';

@Component({
    selector: 'esub-project',
    styles: [],
    template: `<router-outlet></router-outlet>`
})

export class ProjectComponent implements OnInit {

    constructor(private _projectService: ProjectService) {
      console.log('PROJECTCOMPONENT constructor');
    }

    ngOnInit () {

        // TODO: Add code to check if a project is selected.
        // If not, then redirect to selection page
        // If so, then load Project menu
    }
}
