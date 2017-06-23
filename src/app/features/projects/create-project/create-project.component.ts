import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'esub-create-project',
    styles: [],
    templateUrl: './create-project.component.html',
})
export class CreateProjectComponent implements OnInit {

    constructor () {

        console.log('CreateProject Ctor');
    }

    ngOnInit () {

        console.log('CreateProject OnInit');
    }
}
