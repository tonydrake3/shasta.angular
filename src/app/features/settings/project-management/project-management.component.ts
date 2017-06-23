import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'esub-project-management',
    styles: [],
    templateUrl: './project-management.component.html',
})
export class ProjectManagementComponent implements OnInit {

    constructor () {

        console.log('ProjectManagementComponent Ctor');
    }

    ngOnInit () {

        console.log('ProjectManagementComponent OnInit');
    }
}
