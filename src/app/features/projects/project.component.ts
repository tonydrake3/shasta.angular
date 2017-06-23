import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';

@Component({
    selector: 'esub-project',
    styles: [],
    template: `<router-outlet></router-outlet>`
})

export class ProjectComponent implements OnInit {

    constructor(private _projectService: ProjectService) {}

    ngOnInit () {

    }
}
