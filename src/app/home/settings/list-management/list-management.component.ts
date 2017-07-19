import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'esub-list-management',
    styles: [],
    templateUrl: './list-management.component.html',
})
export class ListManagementComponent implements OnInit {

    constructor () {

        console.log('ListManagementComponent Ctor');
    }

    ngOnInit () {

        console.log('ListManagementComponent OnInit');
    }
}
